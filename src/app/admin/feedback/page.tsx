import { AdminGate } from "@/components/AdminGate";
import { loadAdminFeedback } from "@/lib/admin/server-data";
import { calculateConnectionScore } from "@/lib/analytics/connectionScore";

export default async function AdminFeedbackPage() {
  const feedback = await loadAdminFeedback();
  const averageRating = feedback.length ? feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length : 0;
  const wouldAttendAgainRate = feedback.length ? feedback.filter((item) => item.wouldAttendAgain).length / feedback.length : 0;
  const workplaceConnectionImprovementRate = feedback.length ? feedback.filter((item) => item.helpedWorkplaceConnection).length / feedback.length : 0;
  const meetAgainRate = feedback.length ? feedback.filter((item) => item.peopleTheyWouldMeetAgain.length > 0).length / feedback.length : 0;
  const connectionScore = feedback.length
    ? calculateConnectionScore({ averageRating, attendanceRate: 0.74, wouldAttendAgainRate, workplaceConnectionImprovementRate, meetAgainRate })
    : null;

  return (
    <AdminGate>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Admin</p>
      <h1 className="mt-4 font-display text-5xl text-espresso">Feedback</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Metric label="Average rating" value={feedback.length ? averageRating.toFixed(1) : "—"} />
        <Metric label="Would attend again" value={feedback.length ? `${Math.round(wouldAttendAgainRate * 100)}%` : "—"} />
        <Metric label="Workplace connection" value={feedback.length ? `${Math.round(workplaceConnectionImprovementRate * 100)}%` : "—"} />
        <Metric label="Connection score" value={connectionScore === null ? "—" : `${connectionScore}`} />
      </div>
      </main>
    </AdminGate>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-espresso/10 bg-white/75 p-6 shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">{label}</p>
      <p className="mt-3 font-display text-5xl text-espresso">{value}</p>
    </div>
  );
}
