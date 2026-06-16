import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";
import { getAuthContext } from "@/lib/auth/server";

export default async function AdminSignupPage() {
  const auth = await getAuthContext();
  if (auth.configured && auth.userId) redirect("/admin/request-access");

  return (
    <>
      <Header />
      <main className="px-5 py-12 md:px-8 md:py-20">
        <AuthForm mode="signup" configured={auth.configured} audience="admin" />
      </main>
    </>
  );
}
