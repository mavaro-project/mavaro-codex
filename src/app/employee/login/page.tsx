import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";
import { getAuthContext } from "@/lib/auth/server";

export default async function EmployeeLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const auth = await getAuthContext();
  const params = await searchParams;
  const nextPath = safeNextPath(params.next, "/employee/dashboard");

  if (auth.configured && auth.userId) redirect(nextPath);

  return (
    <>
      <Header />
      <main className="px-5 py-12 md:px-8 md:py-20">
        <AuthForm mode="login" configured={auth.configured} nextPath={nextPath} audience="employee" />
      </main>
    </>
  );
}

function safeNextPath(value: string | undefined, fallback: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
