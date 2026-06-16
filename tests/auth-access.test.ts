import { describe, expect, it } from "vitest";
import { resolveAdminAccess, resolveMemberAccess } from "../src/lib/auth/access-control";

describe("route access", () => {
  it("keeps employee and admin routes available in demo mode", () => {
    expect(resolveMemberAccess({ configured: false, authenticated: false })).toBe("allow");
    expect(resolveAdminAccess({ configured: false, authenticated: false, isAdmin: false })).toBe("allow");
  });

  it("requires authentication for configured employee routes", () => {
    expect(resolveMemberAccess({ configured: true, authenticated: false })).toBe("login");
    expect(resolveMemberAccess({ configured: true, authenticated: true })).toBe("allow");
  });

  it("denies authenticated non-admin users from admin routes", () => {
    expect(resolveAdminAccess({ configured: true, authenticated: false, isAdmin: false })).toBe("login");
    expect(resolveAdminAccess({ configured: true, authenticated: true, isAdmin: false })).toBe("denied");
    expect(resolveAdminAccess({ configured: true, authenticated: true, isAdmin: true })).toBe("allow");
  });
});
