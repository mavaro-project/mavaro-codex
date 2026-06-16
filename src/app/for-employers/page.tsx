import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function ForEmployersPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">For employers</p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl tracking-tight text-espresso">
          Employee belonging programs your team can actually feel.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-espresso/68">
          Mavaro helps People, Workplace, and Employee Experience teams launch recurring circles for onboarding,
          hybrid culture, ERGs, manager support, and cross-team relationships.
        </p>
        <div className="mt-8">
          <Button href="/admin/request-access">Start an Employer Pilot</Button>
        </div>
      </main>
    </>
  );
}
