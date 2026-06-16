import { Header } from "@/components/Header";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Terms</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Pilot-based terms for employer programs.</h1>
        <p className="mt-5 leading-8 text-espresso/68">
          Mavaro employer pilots are designed for companies evaluating recurring employee connection programs. Final
          legal terms, data processing terms, and service levels should be completed before a paid production pilot.
        </p>
      </main>
    </>
  );
}
