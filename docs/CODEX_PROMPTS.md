# Codex Prompts for Next Build Steps

Use these as small implementation tickets after opening this repo in Codex.

## Connect pilot form to Supabase

```text
Replace the localStorage pilot lead flow with Supabase writes to the pilot_leads table.
Keep localStorage as a fallback if env vars are missing. Add error and success states.
```

## Add Supabase Auth

```text
Add Supabase Auth using email magic links. Create sign in, sign out, and protected dashboard/admin shells. Profiles should be created after onboarding and linked to auth.users.
```

## Productionize admin roles

```text
Add an admin role model. Only admins should access /admin. Create RLS policies so community members can only read their own profile, RSVPs, and circle assignment.
```

## Add email reminders

```text
Integrate Resend for event reminders. Admins should be able to send circle invitation emails and 24-hour event reminders.
```

## Add Stripe pilot billing

```text
Create a Stripe checkout flow for B2B pilots. Products should include Starter Pilot, Building Plan, and Employer Plan.
```
