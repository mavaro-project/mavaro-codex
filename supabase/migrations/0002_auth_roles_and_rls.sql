-- Authenticated persistence, organization-scoped admin roles, and hardened RLS.

do $$
begin
  create type public.admin_role as enum ('admin', 'owner');
exception
  when duplicate_object then null;
end
$$;

create table if not exists public.admin_memberships (
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role public.admin_role not null default 'admin',
  created_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);

alter table public.venues
add column if not exists organization_id uuid references public.organizations(id) on delete cascade;

delete from public.feedback
where id in (
  select id
  from (
    select
      id,
      row_number() over (
        partition by event_id, user_id
        order by created_at desc, id desc
      ) as duplicate_rank
    from public.feedback
  ) ranked
  where duplicate_rank > 1
);

create unique index if not exists feedback_event_user_key
on public.feedback (event_id, user_id);

create index if not exists profiles_organization_id_idx on public.profiles (organization_id);
create index if not exists circles_organization_id_idx on public.circles (organization_id);
create index if not exists events_circle_id_idx on public.events (circle_id);
create index if not exists admin_memberships_organization_id_idx on public.admin_memberships (organization_id);

create or replace function public.current_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id
  from public.profiles
  where id = (select auth.uid())
$$;

create or replace function public.is_org_admin(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_memberships
    where user_id = (select auth.uid())
      and organization_id = target_organization_id
  )
$$;

create or replace function public.is_org_owner(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_memberships
    where user_id = (select auth.uid())
      and organization_id = target_organization_id
      and role = 'owner'
  )
$$;

create or replace function public.is_circle_member(target_circle_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.circle_members
    where user_id = (select auth.uid())
      and circle_id = target_circle_id
  )
$$;

create or replace function public.circle_organization_id(target_circle_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.circles where id = target_circle_id
$$;

create or replace function public.event_organization_id(target_event_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select c.organization_id
  from public.events e
  join public.circles c on c.id = e.circle_id
  where e.id = target_event_id
$$;

create or replace function public.is_event_member(target_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.events e
    join public.circle_members cm on cm.circle_id = e.circle_id
    where e.id = target_event_id
      and cm.user_id = (select auth.uid())
  )
$$;

create or replace function public.resolve_onboarding_organization(requested_type public.organization_type)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.organizations
  where type = requested_type
  order by created_at
  limit 1
$$;

create or replace function public.get_my_circle_members(target_circle_id uuid)
returns table (id uuid, name text, neighborhood text)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_circle_member(target_circle_id)
     and not public.is_org_admin(public.circle_organization_id(target_circle_id)) then
    raise exception 'not authorized';
  end if;

  return query
    select p.id, p.name, p.neighborhood
    from public.circle_members cm
    join public.profiles p on p.id = cm.user_id
    where cm.circle_id = target_circle_id
    order by cm.created_at;
end;
$$;

create or replace function public.save_circle_proposal(proposal jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_circle_id uuid;
  target_organization_id uuid;
  member_id uuid;
  member_count int;
begin
  target_organization_id := (proposal ->> 'organization_id')::uuid;

  if not public.is_org_admin(target_organization_id) then
    raise exception 'not authorized';
  end if;

  member_count := jsonb_array_length(coalesce(proposal -> 'member_ids', '[]'::jsonb));
  if member_count < 5 or member_count > 10 then
    raise exception 'circle size must be between 5 and 10';
  end if;

  insert into public.circles (
    organization_id,
    name,
    theme,
    status,
    start_date,
    duration_weeks,
    score,
    explanation
  )
  values (
    target_organization_id,
    proposal ->> 'name',
    proposal ->> 'theme',
    'draft',
    nullif(proposal ->> 'start_date', '')::date,
    coalesce((proposal ->> 'duration_weeks')::int, 6),
    (proposal ->> 'score')::int,
    coalesce(array(select jsonb_array_elements_text(proposal -> 'explanation')), '{}')
  )
  returning id into new_circle_id;

  for member_id in
    select value::uuid from jsonb_array_elements_text(proposal -> 'member_ids')
  loop
    if not exists (
      select 1 from public.profiles
      where id = member_id and organization_id = target_organization_id
    ) then
      raise exception 'member is not eligible for this organization';
    end if;

    insert into public.circle_members (circle_id, user_id)
    values (new_circle_id, member_id);
  end loop;

  return new_circle_id;
end;
$$;

alter table public.admin_memberships enable row level security;

drop policy if exists "Profiles can read themselves" on public.profiles;
drop policy if exists "Profiles can update themselves" on public.profiles;
drop policy if exists "Profiles can insert themselves" on public.profiles;
drop policy if exists "Authenticated users can read orgs" on public.organizations;
drop policy if exists "Authenticated users can read circles" on public.circles;
drop policy if exists "Authenticated users can read circle members" on public.circle_members;
drop policy if exists "Authenticated users can read events" on public.events;
drop policy if exists "Users can manage their RSVPs" on public.rsvps;
drop policy if exists "Users can submit their feedback" on public.feedback;
drop policy if exists "Users can read their feedback" on public.feedback;
drop policy if exists "Anyone can create pilot lead" on public.pilot_leads;

create policy "Users read own profile and admins read organization profiles"
on public.profiles for select to authenticated
using (
  (select auth.uid()) = id
  or public.is_org_admin(organization_id)
);

create policy "Users insert own constrained profile"
on public.profiles for insert to authenticated
with check (
  (select auth.uid()) = id
  and (
    organization_id is null
    or organization_id = public.resolve_onboarding_organization(organization_type)
  )
);

create policy "Users update own constrained profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check (
  (select auth.uid()) = id
  and (
    organization_id is null
    or organization_id = public.resolve_onboarding_organization(organization_type)
  )
);

create policy "Admins update organization profiles"
on public.profiles for update to authenticated
using (public.is_org_admin(organization_id))
with check (public.is_org_admin(organization_id));

create policy "Admins remove organization profiles"
on public.profiles for delete to authenticated
using (public.is_org_admin(organization_id));

create policy "Members read their organization"
on public.organizations for select to authenticated
using (
  id = public.current_organization_id()
  or public.is_org_admin(id)
);

create policy "Admins update organizations"
on public.organizations for update to authenticated
using (public.is_org_admin(id))
with check (public.is_org_admin(id));

create policy "Owners delete organizations"
on public.organizations for delete to authenticated
using (public.is_org_owner(id));

create policy "Members read their circles"
on public.circles for select to authenticated
using (
  public.is_circle_member(id)
  or public.is_org_admin(organization_id)
);

create policy "Admins insert circles"
on public.circles for insert to authenticated
with check (public.is_org_admin(organization_id));

create policy "Admins update circles"
on public.circles for update to authenticated
using (public.is_org_admin(organization_id))
with check (public.is_org_admin(organization_id));

create policy "Admins delete circles"
on public.circles for delete to authenticated
using (public.is_org_admin(organization_id));

create policy "Members read membership in their circles"
on public.circle_members for select to authenticated
using (
  public.is_circle_member(circle_id)
  or public.is_org_admin(public.circle_organization_id(circle_id))
);

create policy "Admins insert circle members"
on public.circle_members for insert to authenticated
with check (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Admins update circle members"
on public.circle_members for update to authenticated
using (public.is_org_admin(public.circle_organization_id(circle_id)))
with check (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Admins delete circle members"
on public.circle_members for delete to authenticated
using (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Members read their circle events"
on public.events for select to authenticated
using (
  public.is_circle_member(circle_id)
  or public.is_org_admin(public.circle_organization_id(circle_id))
);

create policy "Admins insert events"
on public.events for insert to authenticated
with check (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Admins update events"
on public.events for update to authenticated
using (public.is_org_admin(public.circle_organization_id(circle_id)))
with check (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Admins delete events"
on public.events for delete to authenticated
using (public.is_org_admin(public.circle_organization_id(circle_id)));

create policy "Users read own RSVPs and admins read organization RSVPs"
on public.rsvps for select to authenticated
using (
  (select auth.uid()) = user_id
  or public.is_org_admin(public.event_organization_id(event_id))
);

create policy "Users insert own RSVPs"
on public.rsvps for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and public.is_event_member(event_id)
);

create policy "Users update own RSVPs"
on public.rsvps for update to authenticated
using ((select auth.uid()) = user_id)
with check (
  (select auth.uid()) = user_id
  and public.is_event_member(event_id)
);

create policy "Users delete own RSVPs"
on public.rsvps for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Users read own feedback and admins read organization feedback"
on public.feedback for select to authenticated
using (
  (select auth.uid()) = user_id
  or public.is_org_admin(public.event_organization_id(event_id))
);

create policy "Users insert own feedback"
on public.feedback for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and public.is_event_member(event_id)
);

create policy "Users update own feedback"
on public.feedback for update to authenticated
using ((select auth.uid()) = user_id)
with check (
  (select auth.uid()) = user_id
  and public.is_event_member(event_id)
);

create policy "Users delete own feedback"
on public.feedback for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Admins manage organization venues"
on public.venues for all to authenticated
using (public.is_org_admin(organization_id))
with check (public.is_org_admin(organization_id));

create policy "Users read own admin memberships"
on public.admin_memberships for select to authenticated
using (
  (select auth.uid()) = user_id
  or public.is_org_admin(organization_id)
);

create policy "Owners add admin memberships"
on public.admin_memberships for insert to authenticated
with check (public.is_org_owner(organization_id));

create policy "Owners update admin memberships"
on public.admin_memberships for update to authenticated
using (public.is_org_owner(organization_id))
with check (public.is_org_owner(organization_id));

create policy "Owners remove admin memberships"
on public.admin_memberships for delete to authenticated
using (public.is_org_owner(organization_id));

revoke all on all tables in schema public from anon;
revoke all on table public.pilot_leads from anon, authenticated;
grant select, insert, update, delete on
  public.organizations,
  public.profiles,
  public.venues,
  public.circles,
  public.circle_members,
  public.events,
  public.rsvps,
  public.feedback,
  public.admin_memberships
to authenticated;

grant all on all tables in schema public to service_role;

revoke all on function public.current_organization_id() from public;
revoke all on function public.is_org_admin(uuid) from public;
revoke all on function public.is_org_owner(uuid) from public;
revoke all on function public.is_circle_member(uuid) from public;
revoke all on function public.circle_organization_id(uuid) from public;
revoke all on function public.event_organization_id(uuid) from public;
revoke all on function public.is_event_member(uuid) from public;
revoke all on function public.resolve_onboarding_organization(public.organization_type) from public;
revoke all on function public.get_my_circle_members(uuid) from public;
revoke all on function public.save_circle_proposal(jsonb) from public;

grant execute on function public.current_organization_id() to authenticated;
grant execute on function public.is_org_admin(uuid) to authenticated;
grant execute on function public.is_org_owner(uuid) to authenticated;
grant execute on function public.is_circle_member(uuid) to authenticated;
grant execute on function public.circle_organization_id(uuid) to authenticated;
grant execute on function public.event_organization_id(uuid) to authenticated;
grant execute on function public.is_event_member(uuid) to authenticated;
grant execute on function public.resolve_onboarding_organization(public.organization_type) to authenticated;
grant execute on function public.get_my_circle_members(uuid) to authenticated;
grant execute on function public.save_circle_proposal(jsonb) to authenticated;
