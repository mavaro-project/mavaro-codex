import { AdminClient } from "@/components/AdminClient";
import { AdminGate } from "@/components/AdminGate";

export default function AdminDashboardPage() {
  return (
    <AdminGate>
      <AdminClient />
    </AdminGate>
  );
}
