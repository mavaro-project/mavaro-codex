import Link from "next/link";
import { Button } from "./Button";
import { LogoutButton } from "./LogoutButton";
import { getAuthContext } from "@/lib/auth/server";

export async function Header() {
  const auth = await getAuthContext();

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-lg font-semibold text-parchment shadow-card">
          M
        </span>
        <span className="font-display text-2xl tracking-tight text-espresso">Mavaro</span>
        {!auth.configured ? (
          <span className="hidden rounded-full border border-espresso/10 bg-white/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/55 lg:inline-flex">
            Demo
          </span>
        ) : null}
      </Link>
      <nav className="hidden items-center gap-7 text-sm text-espresso/70 md:flex">
        <Link href="/for-employers">For employers</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/pilot">Pilot</Link>
        <Link href="/admin/dashboard">Admin</Link>
      </nav>
      <div className="flex items-center gap-2">
        {auth.configured && auth.userId ? (
          <>
            <Button href="/employee/account" variant="secondary">Account</Button>
            <div className="hidden sm:block"><LogoutButton compact /></div>
          </>
        ) : (
          <Button href={auth.configured ? "/employee/login" : "/employee/onboarding"} variant="secondary" className="hidden sm:inline-flex">
            {auth.configured ? "Employee Login" : "Join with Invite"}
          </Button>
        )}
        <Button href="/admin/request-access">Start an Employer Pilot</Button>
      </div>
    </header>
  );
}
