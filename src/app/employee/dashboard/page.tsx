import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/DashboardClient";
import { Header } from "@/components/Header";
import { getMemberAccess } from "@/lib/auth/server";

export default async function EmployeeDashboardPage() {
  const auth = await getMemberAccess();
  if (auth.access === "login") redirect("/employee/login?next=/employee/dashboard");

  return (
    <>
      <Header />
      <DashboardClient />
    </>
  );
}
