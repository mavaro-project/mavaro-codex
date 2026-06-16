import { describe, expect, it } from "vitest";
import { getPersistenceMode } from "../src/lib/supabase/config";

describe("Supabase fallback", () => {
  it("uses demo persistence when either public environment variable is missing", () => {
    expect(getPersistenceMode({})).toBe("demo");
    expect(getPersistenceMode({ NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co" })).toBe("demo");
  });

  it("uses Supabase only when both public environment variables are present", () => {
    expect(
      getPersistenceMode({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      }),
    ).toBe("supabase");
  });
});
