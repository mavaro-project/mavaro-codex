# Mavaro MVP

Mavaro is an employee connection platform for companies. It helps People, HR, Workplace, Culture, and Employee Experience teams create recurring small-group employee circles that strengthen onboarding, hybrid culture, and workplace belonging.

## Included

- Employer-focused landing page and pilot request flow
- Employee and company-admin auth routes
- Employee onboarding linked to the authenticated user
- Employee dashboard with circle, events, RSVP, and feedback
- Company-scoped admin access
- Review-and-approve employee circle generation
- Supabase-backed profiles, company workspaces, circles, employees, events, RSVPs, feedback, and pilot requests
- Local demo fallback when Supabase public environment variables are absent

## Local Development

```bash
npm install
npm run dev
```

Useful routes:

- `/` employer-first landing page
- `/for-employers`
- `/how-it-works`
- `/pilot`
- `/employee/signup`
- `/employee/login`
- `/employee/onboarding`
- `/employee/dashboard`
- `/employee/circle`
- `/employee/events`
- `/employee/feedback`
- `/employee/account`
- `/admin/request-access`
- `/admin/login`
- `/admin/signup`
- `/admin/dashboard`
- `/admin/company`
- `/admin/employees`
- `/admin/circles`
- `/admin/circles/generate`
- `/admin/events`
- `/admin/feedback`
- `/admin/settings`

Legacy `/login`, `/signup`, `/onboarding`, `/dashboard`, and `/admin` routes redirect to the new employee/admin paths.

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Production:

```bash
NEXT_PUBLIC_APP_URL=https://mavaro.org
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` may contain the project’s legacy anon key or current publishable key. It is intentionally public and protected by Row Level Security.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`, commit it, log it, or expose it to browser code. Mavaro uses it only for server-side pilot request writes.

If either public Supabase variable is missing, Mavaro automatically uses local browser demo persistence and leaves auth guards open for product walkthroughs.

## Supabase Setup

1. Create a Supabase project.
2. Run these migrations in order:

```text
supabase/migrations/0001_schema.sql
supabase/migrations/0002_auth_roles_and_rls.sql
supabase/migrations/0003_employer_focus.sql
```

3. Add at least one employer workspace:

```sql
insert into public.organizations (
  name,
  type,
  city,
  neighborhood,
  industry,
  company_size,
  headquarters_city,
  office_locations,
  workplace_model
)
values (
  'NovaWorks',
  'employer',
  'New York',
  'NYC Office Hub',
  'Technology',
  '201-500',
  'New York',
  array['New York'],
  'Hybrid'
);
```

The current MVP keeps `public.organizations` internally as the company workspace table for compatibility. The UI, routes, and copy expose only employer/company language. A future migration can rename this table to `companies` once a live Supabase project is connected and backed up.

4. In Supabase Auth URL Configuration, set:

```text
Site URL: http://localhost:3000
Redirect URL: http://localhost:3000/auth/callback
Production redirect: https://mavaro.org/auth/callback
```

5. Enable Email authentication.
6. Sign up, confirm the email if required, and complete employee onboarding.
7. Bootstrap the first company owner:

```sql
insert into public.admin_memberships (user_id, organization_id, role)
select p.id, o.id, 'owner'
from public.profiles p
join public.organizations o on o.id = p.organization_id
where p.email = 'owner@example.com'
on conflict (user_id, organization_id)
do update set role = excluded.role;
```

## Security Model

- Employees can read and update only their own profile.
- Employees see only their own circle membership and events.
- Employees can create/update their own RSVPs and feedback only for events in their circles.
- Company admins can manage employees, circles, events, and feedback inside their company workspace.
- Company admins cannot access another company’s data.
- Pilot requests have no anonymous/client-side table policy and are written only through the server-only service-role route.

## Matching

Admins generate proposed circles from eligible employees in their company. Nothing is persisted until the admin clicks **Approve and save circles**.

The engine scores:

- Shared availability
- Shared employee connection goals
- Same or nearby office/city
- Compatible work mode
- Program type fit
- Cross-functional diversity
- Tenure fit
- Role-level compatibility

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Production Follow-Ups

- Invitation codes or company-specific invite links
- Admin UI for employee invites and circle assignment
- Dedicated `companies` table rename after Supabase backup
- SSO and HRIS import
- Email reminders and calendar invitations
- Generated Supabase TypeScript types in CI
- Audit logging for admin actions
- Rate limiting and bot protection on auth and pilot requests
