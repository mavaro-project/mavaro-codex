import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { OnboardingForm } from "@/components/OnboardingForm";
import { getMemberAccess } from "@/lib/auth/server";

export default async function EmployeeOnboardingPage() {
  const auth = await getMemberAccess();
  if (auth.access === "login") redirect("/employee/signup");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <OnboardingForm authenticatedUserId={auth.userId} authenticatedEmail={auth.email} />
      </main>
    </>
  );
}
