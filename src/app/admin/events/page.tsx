import { AdminGate } from "@/components/AdminGate";
import { loadAdminEvents } from "@/lib/admin/server-data";

export default async function EventsPage() {
  const events = await loadAdminEvents();
  return (
    <AdminGate>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Events</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
              <h2 className="font-display text-3xl text-espresso">{event.title}</h2>
              <p className="mt-2 text-espresso/60">{event.location}</p>
              <p className="mt-4 leading-7 text-espresso/65">{event.description}</p>
            </div>
          ))}
          {!events.length ? <p className="text-espresso/60">No events are scheduled yet.</p> : null}
        </div>
      </main>
    </AdminGate>
  );
}
