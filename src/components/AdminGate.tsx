import { redirect } from "next/navigation";
import { AccessDenied } from "./AccessDenied";
import { Header } from "./Header";
import { getAdminAccess } from "@/lib/auth/server";

export async function AdminGate({ children }: { children: React.ReactNode }) {
  const admin = await getAdminAccess();
  if (admin.access === "login") redirect("/admin/login?next=/admin/dashboard");
  if (admin.access === "denied") {
    return (
      <>
        <Header />
        <AccessDenied />
      </>
    );
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
}
