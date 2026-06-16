import { Header } from "@/components/Header";
import { PilotForm } from "@/components/PilotForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function RequestAccessPage() {
  const supabaseConfigured = isSupabaseConfigured();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Employer pilot</p>
            <h1 className="mt-4 font-display text-6xl tracking-tight text-espresso">Start an Employer Pilot</h1>
            <p className="mt-5 text-lg leading-8 text-espresso/68">
              Launch recurring employee circles that strengthen onboarding, hybrid culture, and workplace belonging.
            </p>
            <p className="mt-5 rounded-2xl bg-sage/15 p-4 text-sm leading-6 text-espresso/65">
              {supabaseConfigured
                ? "Mavaro employer pilots are designed for companies looking to improve employee belonging through recurring small-group connection programs."
                : "This workspace is in demo mode. Requests stay in this browser until Supabase is connected."}
            </p>
          </div>
          <PilotForm />
        </div>
      </main>
    </>
  );
}
