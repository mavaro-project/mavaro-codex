export type RouteAccess = "allow" | "login" | "denied";

export function resolveMemberAccess(input: { configured: boolean; authenticated: boolean }): RouteAccess {
  if (!input.configured) return "allow";
  return input.authenticated ? "allow" : "login";
}

export function resolveAdminAccess(input: {
  configured: boolean;
  authenticated: boolean;
  isAdmin: boolean;
}): RouteAccess {
  if (!input.configured) return "allow";
  if (!input.authenticated) return "login";
  return input.isAdmin ? "allow" : "denied";
}
