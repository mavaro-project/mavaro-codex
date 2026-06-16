import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  new URL("../supabase/migrations/0002_auth_roles_and_rls.sql", import.meta.url),
  "utf8",
);
const employerMigration = readFileSync(
  new URL("../supabase/migrations/0003_employer_focus.sql", import.meta.url),
  "utf8",
);

describe("Supabase RLS migration", () => {
  it("removes the original broad policies", () => {
    expect(migration).toContain(
      'drop policy if exists "Authenticated users can read orgs"',
    );
    expect(migration).toContain(
      'drop policy if exists "Users can manage their RSVPs"',
    );
    expect(migration).toContain(
      'drop policy if exists "Users can submit their feedback"',
    );
  });

  it("binds employee writes to the authenticated user and their event", () => {
    expect(migration).toContain("user_id = (select auth.uid())");
    expect(migration).toContain("public.is_event_member(event_id)");
  });

  it("does not expose pilot leads to anonymous clients", () => {
    expect(migration).toContain(
      "revoke all on table public.pilot_leads from anon, authenticated;",
    );
    expect(migration).not.toContain('create policy "Public pilot lead');
  });

  it("keeps employer pilot requests service-role only", () => {
    expect(employerMigration).toContain("alter table public.pilot_requests enable row level security");
    expect(employerMigration).toContain("revoke all on table public.pilot_requests from anon, authenticated;");
    expect(employerMigration).toContain("grant all on table public.pilot_requests to service_role;");
  });
});
