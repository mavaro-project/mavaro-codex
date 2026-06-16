import { AdminGate } from "@/components/AdminGate";
import { loadAdminOrganizations } from "@/lib/admin/server-data";

export default async function OrganizationsPage() {
  const organizations = await loadAdminOrganizations();
  return (
    <AdminGate>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Company</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {organizations.map((organization) => (
            <div key={organization.id} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
              <h2 className="font-display text-3xl text-espresso">{organization.name}</h2>
              <p className="mt-2 text-espresso/60">{organization.city} · {organization.workplaceModel ?? "Hybrid"}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.16em] text-terracotta">{organization.industry ?? "Employer"}</p>
            </div>
          ))}
          {!organizations.length ? <p className="text-espresso/60">Create your company workspace to start launching employee connection programs.</p> : null}
        </div>
      </main>
    </AdminGate>
  );
}
