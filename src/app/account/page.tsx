import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { LogoutButton } from "@/components/LogoutButton";
import { getMemberAccess } from "@/lib/auth/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const auth = await getMemberAccess();
  if (auth.access === "login") redirect("/employee/login?next=/employee/account");

  if (!auth.configured) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
          <div className="rounded-[2.5rem] border border-espresso/10 bg-white/72 p-8 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Demo account</p>
            <h1 className="mt-4 font-display text-5xl text-espresso">Your local employee profile.</h1>
            <p className="mt-4 leading-7 text-espresso/65">
              Demo mode stores your profile, RSVP, and feedback in this browser. Connect Supabase to enable a real account.
            </p>
            <Button href="/employee/onboarding" className="mt-7">Edit employee profile</Button>
          </div>
        </main>
      </>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: profile } = supabase
    ? await supabase.from("profiles").select("name, email, city, neighborhood").eq("id", auth.userId!).maybeSingle()
    : { data: null };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
        <div className="rounded-[2.5rem] border border-espresso/10 bg-white/72 p-8 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">Account</p>
          <h1 className="mt-4 font-display text-5xl text-espresso">{profile?.name || "Your Mavaro account"}</h1>
          <div className="mt-6 rounded-2xl bg-oat/70 p-5 leading-7 text-espresso/70">
            <p><strong>Email:</strong> {profile?.email || auth.email}</p>
            <p><strong>Office/city:</strong> {[profile?.neighborhood, profile?.city].filter(Boolean).join(", ") || "Complete onboarding"}</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/employee/onboarding">Edit profile</Button>
            <LogoutButton />
          </div>
        </div>
      </main>
    </>
  );
}
