import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

const steps = [
  {
    num: "01",
    title: "Admin setup",
    body: "Create a workspace and pick a program — New Hire, Hybrid, ERG, and more.",
  },
  {
    num: "02",
    title: "Employee profiles",
    body: "Employees join via invite link and complete a 3-minute onboarding profile.",
  },
  {
    num: "03",
    title: "Circle matching",
    body: "Mavaro proposes groups of 5–10. Admins review every cohort before launch.",
  },
  {
    num: "04",
    title: "Recurring sessions",
    body: "Employees RSVP and attend coffee, lunch, or walk-and-talk circles.",
  },
  {
    num: "05",
    title: "Feedback & score",
    body: "Post-session feedback builds a connection score HR can actually report.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        {/* Hero */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">How it works</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.94] tracking-tight text-espresso md:text-7xl">
            Five steps to real employee connection.
          </h1>
          <p className="mt-5 text-lg leading-8 text-espresso/60">
            Mavaro turns a People team&apos;s intent into recurring, measurable circles — in a day.
          </p>
        </div>

        {/* Horizontal steps */}
        <div className="overflow-x-auto pb-2">
          <div className="relative min-w-[640px]">
            {/* Connecting line */}
            <div className="absolute left-[calc(10%+1.25rem)] right-[calc(10%+1.25rem)] top-5 h-px bg-espresso/10" />

            <div className="relative grid grid-cols-5 gap-3">
              {steps.map((step) => (
                <div key={step.num} className="group flex flex-col items-center text-center">
                  {/* Number bubble */}
                  <div className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-sm font-bold text-white shadow-card transition group-hover:bg-white group-hover:text-terracotta group-hover:ring-2 group-hover:ring-terracotta">
                    {step.num}
                  </div>
                  {/* Card */}
                  <div className="w-full rounded-[1.5rem] border border-espresso/8 bg-white p-5 shadow-card transition group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:bg-terracotta group-hover:shadow-soft">
                    <p className="font-semibold text-espresso transition group-hover:text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-espresso/58 transition group-hover:text-white/80">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matching engine */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] border border-espresso/8 bg-white p-8 shadow-card">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Matching engine</p>
            <h2 className="mt-4 font-display text-4xl text-espresso">Smart groups, not random pairings.</h2>
            <p className="mt-4 leading-7 text-espresso/60">
              Mavaro evaluates availability, office location, work mode, tenure, department, role level,
              and connection goals to propose circles that feel intentional — not like a random Slack add.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Availability", "Office location", "Work mode", "Tenure", "Department diversity", "Role level", "Connection goals", "Program type"].map((tag) => (
                <span key={tag} className="pill">{tag}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-espresso p-8 text-parchment shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-marigold">Connection score</p>
            <h2 className="mt-4 font-display text-4xl">Measurable belonging.</h2>
            <p className="mt-4 leading-7 text-parchment/65">
              After each session, employees answer: did this help you feel more connected at work? That
              signal — combined with attendance, ratings, and repeat intent — becomes one reportable score.
            </p>
            <div className="mt-6 rounded-[1.5rem] bg-parchment/10 p-5">
              <p className="font-display text-3xl text-parchment">&ldquo;78 connection score. 84% felt more connected.&rdquo;</p>
              <p className="mt-2 text-sm text-parchment/50">Q2 New Hire Circle program</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-[2rem] border border-espresso/8 bg-white px-8 py-12 text-center shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Ready to start?</p>
          <h2 className="font-display text-4xl text-espresso md:text-5xl">Launch your first circle today.</h2>
          <p className="max-w-xl text-espresso/60">
            Pilots are designed for HR and People teams who want to measure whether their culture investments actually work.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/for-employers" variant="secondary">For employers</Button>
          </div>
        </div>
      </main>
    </>
  );
}
