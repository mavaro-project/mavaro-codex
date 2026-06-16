import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProfileRole } from "@/lib/types";
import { resolveAdminAccess, resolveMemberAccess } from "./access-control";

export interface AuthContext {
  configured: boolean;
  userId: string | null;
  email: string | null;
}

export interface AdminContext extends AuthContext {
  organizationId: string | null;
  role: ProfileRole | null;
  access: ReturnType<typeof resolveAdminAccess>;
}

export async function getAuthContext(): Promise<AuthContext> {
  if (!isSupabaseConfigured()) {
    return { configured: false, userId: null, email: null };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { configured: false, userId: null, email: null };

  const { data, error } = await supabase.auth.getClaims();
  const claims = error ? null : data?.claims;

  return {
    configured: true,
    userId: typeof claims?.sub === "string" ? claims.sub : null,
    email: typeof claims?.email === "string" ? claims.email : null,
  };
}

export async function getMemberAccess() {
  const auth = await getAuthContext();
  return {
    ...auth,
    access: resolveMemberAccess({
      configured: auth.configured,
      authenticated: Boolean(auth.userId),
    }),
  };
}

export async function getAdminAccess(): Promise<AdminContext> {
  const auth = await getAuthContext();

  if (!auth.configured || !auth.userId) {
    return {
      ...auth,
      organizationId: null,
      role: null,
      access: resolveAdminAccess({
        configured: auth.configured,
        authenticated: Boolean(auth.userId),
        isAdmin: false,
      }),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase
        .from("admin_memberships")
        .select("organization_id, role")
        .eq("user_id", auth.userId)
        .limit(1)
        .maybeSingle()
    : { data: null };

  return {
    ...auth,
    organizationId: data?.organization_id ?? null,
    role: data?.role ?? null,
    access: resolveAdminAccess({
      configured: true,
      authenticated: true,
      isAdmin: Boolean(data),
    }),
  };
}
