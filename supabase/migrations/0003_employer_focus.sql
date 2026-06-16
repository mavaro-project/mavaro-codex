-- Employer-focused fields for the Mavaro B2B pilot.
-- The app keeps public.organizations internally for compatibility, but uses it as the company workspace table.

alter table public.organizations
add column if not exists industry text,
add column if not exists company_size text,
add column if not exists headquarters_city text,
add column if not exists office_locations text[] default '{}',
add column if not exists workplace_model text,
add column if not exists status text not null default 'active';

update public.organizations
set
  type = 'employer',
  industry = coalesce(industry, 'Technology'),
  company_size = coalesce(company_size, '201-500'),
  headquarters_city = coalesce(headquarters_city, city),
  office_locations = case
    when office_locations is null or array_length(office_locations, 1) is null then array[city]
    else office_locations
  end,
  workplace_model = coalesce(workplace_model, 'Hybrid')
where true;

alter table public.profiles
add column if not exists department text,
add column if not exists work_mode text,
add column if not exists role_level text,
add column if not exists tenure text,
add column if not exists start_date date,
add column if not exists preferred_formats text[] default '{}',
add column if not exists manager_status boolean default false,
add column if not exists erg_interests text[] default '{}',
add column if not exists dietary_restrictions text,
add column if not exists accessibility_needs text,
add column if not exists notes text,
add column if not exists onboarding_completed boolean not null default false;

alter table public.circles
add column if not exists program_type text,
add column if not exists description text,
add column if not exists target_size int not null default 8,
add column if not exists office_city text,
add column if not exists department_filter text;

alter table public.events
add column if not exists company_id uuid references public.organizations(id) on delete cascade,
add column if not exists office_city text,
add column if not exists status text not null default 'draft';

update public.events e
set company_id = c.organization_id
from public.circles c
where e.circle_id = c.id and e.company_id is null;

alter table public.feedback
add column if not exists helped_workplace_connection boolean;

create table if not exists public.pilot_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  work_email text not null,
  company_name text not null,
  company_size text,
  city text,
  title text,
  primary_goal text,
  workplace_model text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.pilot_requests enable row level security;
revoke all on table public.pilot_requests from anon, authenticated;
grant all on table public.pilot_requests to service_role;

create index if not exists profiles_company_context_idx on public.profiles (organization_id, department, work_mode, role_level, tenure);
create index if not exists circles_company_program_idx on public.circles (organization_id, program_type, status);
create index if not exists events_company_id_idx on public.events (company_id);
create index if not exists pilot_requests_status_idx on public.pilot_requests (status, created_at);
