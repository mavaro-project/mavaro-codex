import { Header } from "@/components/Header";

const steps = [
  "Employees complete a privacy-conscious profile.",
  "Mavaro proposes compatible circles of 5 to 10 employees.",
  "Company admins review and approve cohorts before launch.",
  "Employees RSVP, attend recurring sessions, and share feedback.",
  "People teams track belonging, repeat interest, and connection quality.",
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">How it works</p>
        <h1 className="mt-4 font-display text-6xl text-espresso">Recurring employee circles, measured with care.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[2rem] border border-espresso/10 bg-white/75 p-6 shadow-card">
              <p className="font-display text-5xl text-marigold">0{index + 1}</p>
              <p className="mt-5 leading-7 text-espresso/70">{step}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
