import { AdminGate } from "@/components/AdminGate";
import { loadAdminCircles } from "@/lib/admin/server-data";

export default async function CirclesPage() {
  const circles = await loadAdminCircles();

  return (
    <AdminGate>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Circles</h1>
        <div className="mt-8 space-y-4">
          {circles.map((circle) => (
            <div key={circle.id} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-4xl text-espresso">{circle.name}</h2>
                  <p className="mt-3 text-espresso/65">{circle.programType ?? circle.theme}</p>
                </div>
                <span className="pill">{circle.status}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {circle.members.map((member) => <span className="pill" key={member.id}>{member.name.split(" ")[0]}</span>)}
              </div>
            </div>
          ))}
          {!circles.length ? <p className="text-espresso/60">Generate your first employee circles for onboarding, hybrid connection, or cross-team belonging.</p> : null}
          </div>
      </main>
    </AdminGate>
  );
}
