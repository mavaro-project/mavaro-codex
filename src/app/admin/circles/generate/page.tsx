import { AdminClient } from "@/components/AdminClient";
import { AdminGate } from "@/components/AdminGate";

export default function GenerateCirclesPage() {
  return (
    <AdminGate>
      <AdminClient />
    </AdminGate>
  );
}
