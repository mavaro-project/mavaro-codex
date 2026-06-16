import { AdminGate } from "@/components/AdminGate";
import { loadAdminEmployees } from "@/lib/admin/server-data";

export default async function EmployeesPage() {
  const employees = await loadAdminEmployees();

  return (
    <AdminGate>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
      <h1 className="mt-4 font-display text-5xl text-espresso">Employees</h1>
      <div className="mt-8 overflow-hidden rounded-[2rem] border border-espresso/10 bg-white/75 shadow-card">
        <div className="grid grid-cols-6 gap-3 border-b border-espresso/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-espresso/50">
          <span>Name</span>
          <span>Email</span>
          <span>Team</span>
          <span>Office/city</span>
          <span>Work mode</span>
          <span>Circle</span>
        </div>
        {employees.map((employee) => (
          <div key={employee.id} className="grid grid-cols-6 gap-3 border-b border-espresso/5 px-5 py-4 text-sm text-espresso/72 last:border-b-0">
            <span className="font-semibold text-espresso">{employee.name}</span>
            <span>{employee.email ?? "—"}</span>
            <span>{employee.department ?? "—"}</span>
            <span>{employee.city || "—"}</span>
            <span>{employee.workMode?.replaceAll("_", " ") ?? "—"}</span>
            <span>{employee.onboardingCompleted ? "Profile complete" : "Pending"}</span>
          </div>
        ))}
        {!employees.length ? <p className="p-6 text-sm text-espresso/55">Invite employees or share your onboarding link to start forming employee circles.</p> : null}
      </div>
      </main>
    </AdminGate>
  );
}
