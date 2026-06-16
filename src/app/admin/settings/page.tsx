import { AdminGate } from "@/components/AdminGate";

export default function AdminSettingsPage() {
  return (
    <AdminGate>
      <main className="mx-auto max-w-4xl px-5 py-10 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Settings</h1>
        <div className="mt-8 rounded-[2rem] border border-espresso/10 bg-white/75 p-6 shadow-card">
          <h2 className="font-display text-3xl text-espresso">Pilot controls</h2>
          <p className="mt-3 leading-7 text-espresso/65">
            Settings for invitations, calendar reminders, SSO, and HRIS imports belong here after the Supabase pilot workspace is connected.
          </p>
        </div>
      </main>
    </AdminGate>
  );
}
