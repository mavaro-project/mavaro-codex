export type PersistenceMode = "supabase" | "demo";

export function getPersistenceMode(
  env: Record<string, string | undefined> = process.env,
): PersistenceMode {
  return env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "supabase" : "demo";
}

export function isSupabaseConfigured() {
  return getPersistenceMode() === "supabase";
}

export function getSupabasePublicConfig() {
  if (!isSupabaseConfigured()) return null;

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
