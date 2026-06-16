-- Mavaro MVP schema
-- Run this in Supabase SQL editor or via supabase db push.

create extension if not exists "pgcrypto";

create type organization_type as enum ('apartment_building', 'coworking', 'employer', 'gym', 'venue');
create type circle_status as enum ('draft', 'active', 'completed');
create type rsvp_status as enum ('going', 'maybe', 'cant_go');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type organization_type not null,
  city text not null,
  neighborhood text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null,
  age_range text,
  city text,
  neighborhood text,
  organization_id uuid references public.organizations(id) on delete set null,
  organization_type organization_type,
  interests text[] not null default '{}',
  social_goals text[] not null default '{}',
  availability text[] not null default '{}',
  vibes text[] not null default '{}',
  preferred_group_size int default 8,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  neighborhood text not null,
  type text not null,
  partner_status text not null default 'prospect',
  created_at timestamptz not null default now()
);

create table public.circles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  theme text,
  status circle_status not null default 'draft',
  start_date date,
  duration_weeks int not null default 6,
  score int,
  explanation text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.circle_members (
  circle_id uuid references public.circles(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  primary key (circle_id, user_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid references public.circles(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  title text not null,
  description text,
  location text,
  event_type text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rsvps (
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status rsvp_status not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  rating int check (rating between 1 and 5),
  would_attend_again boolean not null default false,
  people_they_would_meet_again uuid[] not null default '{}',
  comment text,
  created_at timestamptz not null default now()
);

create table public.pilot_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text not null,
  community_type text not null,
  city text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger organizations_updated_at before update on public.organizations
for each row execute function public.set_updated_at();

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create trigger circles_updated_at before update on public.circles
for each row execute function public.set_updated_at();

create trigger events_updated_at before update on public.events
for each row execute function public.set_updated_at();

create trigger rsvps_updated_at before update on public.rsvps
for each row execute function public.set_updated_at();

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.venues enable row level security;
alter table public.circles enable row level security;
alter table public.circle_members enable row level security;
alter table public.events enable row level security;
alter table public.rsvps enable row level security;
alter table public.feedback enable row level security;
alter table public.pilot_leads enable row level security;

-- MVP policies. Tighten admin access before production.
create policy "Profiles can read themselves" on public.profiles
for select using (auth.uid() = id);

create policy "Profiles can update themselves" on public.profiles
for update using (auth.uid() = id);

create policy "Profiles can insert themselves" on public.profiles
for insert with check (auth.uid() = id);

create policy "Authenticated users can read orgs" on public.organizations
for select to authenticated using (true);

create policy "Authenticated users can read circles" on public.circles
for select to authenticated using (true);

create policy "Authenticated users can read circle members" on public.circle_members
for select to authenticated using (true);

create policy "Authenticated users can read events" on public.events
for select to authenticated using (true);

create policy "Users can manage their RSVPs" on public.rsvps
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can submit their feedback" on public.feedback
for insert with check (auth.uid() = user_id);

create policy "Users can read their feedback" on public.feedback
for select using (auth.uid() = user_id);

create policy "Anyone can create pilot lead" on public.pilot_leads
for insert with check (true);
