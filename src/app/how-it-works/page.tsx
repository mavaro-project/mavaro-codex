import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { SectionTitle } from "@/components/SectionTitle";

const steps = [
  {
    num: "01",
    eyebrow: "Company setup",
    title: "A People team creates a company workspace",
    body: "An HR or Employee Experience admin signs up, sets up the company workspace, and chooses a connection program — like New Hire Circles, Hybrid Office-Day Circles, or Cross-Team Lunch Circles. Each program comes with a template that includes recommended group size, cadence, event formats, and measurement goals.",
  },
  {
    num: "02",
    eyebrow: "Employee onboarding",
    title: "Employees complete a short profile",
    body: "Employees receive a company-specific invite link and complete a lightweight onboarding profile. They share their department, office location, work mode, tenure, role level, availability, interests, and what kind of workplace connection they're looking for. This takes about three minutes.",
  },
  {
    num: "03",
    eyebrow: "Circle matching",
    title: "Mavaro proposes curated employee circles",
    body: "The circle matching engine analyzes employee profiles across shared availability, office location, work mode, tenure, department, role level, connection goals, and program type — then proposes small groups of five to ten employees. Admins review every proposed circle before it goes live.",
  },
  {
    num: "04",
    eyebrow: "Recurring gatherings",
    title: "Circles meet on a recurring basis",
    body: "Employees see their circle, upcoming gatherings, and RSVP options in a simple dashboard. Formats are low-pressure: coffee chats, lunch circles, walk-and-talks, office-day gatherings, or team dinners. Sessions happen weekly or biweekly, building real relationships through repetition rather than forced fun.",
  },
  {
    num: "05",
    eyebrow: "Feedback and analytics",
    title: "Employees share feedback after each session",
    body: "After each gathering, employees rate the session, confirm whether it helped them feel more connected at work, and flag people they'd want to meet again. This feedback is anonymous in aggregate and feeds directly into the admin analytics dashboard.",
  },
];

const matchFactors = [
  "Shared availability",
  "Office location or city",
  "Work mode (hybrid, in-office, remote)",
  "Department diversity for cross-team programs",
  "Tenure and new-hire status",
  "Role level compatibility",
  "Connection goals and interests",
  "Program type (onboarding, ERG, wellness, etc.)",
];

const feedbackMetrics = [
  { label: "Session rating", desc: "1–5 stars after each gathering" },
  { label: "Felt more connected", desc: "Did this improve your sense of belonging?" },
  { label: "Would attend again", desc: "Repeat intent signal from every attendee" },
  { label: "Meet-again rate", desc: "Who would you want to see at the next circle?" },
  { label: "RSVP rate", desc: "Commitment before each session" },
  { label: "Attendance rate", desc: "Actual participation vs. expected" },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">How it works</p>
          <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.94] tracking-tight text-espresso md:text-7xl">
            Recurring employee circles, measured with care.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-espresso/68">
            Mavaro replaces random happy hours and disconnected Slack messages with structured, recurring small-group
            programs that build real workplace relationships — and give HR teams the data to prove it.
          </p>
        </section>

        {/* Step-by-step */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`grid gap-6 rounded-[2.5rem] p-8 shadow-card lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10 lg:p-10 ${i === 0 ? "bg-espresso text-parchment" : "border border-espresso/10 bg-white/72"}`}
              >
                <div className={`font-display text-7xl leading-none lg:text-8xl ${i === 0 ? "text-marigold/50" : "text-espresso/12"}`}>
                  {step.num}
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.22em] ${i === 0 ? "text-marigold" : "text-terracotta"}`}>
                    {step.eyebrow}
                  </p>
                  <h2 className={`mt-3 font-display text-4xl tracking-tight ${i === 0 ? "text-parchment" : "text-espresso"}`}>
                    {step.title}
                  </h2>
                  <p className={`mt-4 max-w-3xl leading-8 ${i === 0 ? "text-parchment/70" : "text-espresso/65"}`}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Matching engine deep-dive */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-bronze">Matching engine</p>
              <h2 className="mt-4 font-display text-5xl tracking-tight text-espresso">
                Smart circles, not random groups.
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-espresso/65">
                Mavaro&apos;s matching engine evaluates eight dimensions of employee compatibility to propose circles
                that feel intentional — not like a random Slack channel you were added to. Admins review every
                proposed cohort before employees see it.
              </p>
              <Button href="/admin/request-access" className="mt-7">Start an Employer Pilot</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {matchFactors.map((factor) => (
                <div key={factor} className="rounded-[1.5rem] border border-espresso/10 bg-white/75 px-5 py-4 shadow-card">
                  <p className="text-sm font-semibold text-espresso">{factor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback and analytics */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Analytics" title="The most important metric isn&apos;t events hosted.">
            It&apos;s whether employees actually felt more connected at work. Mavaro&apos;s feedback loop turns session
            data into a single, reportable connection score.
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedbackMetrics.map((m) => (
              <div key={m.label} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
                <p className="font-semibold text-espresso">{m.label}</p>
                <p className="mt-2 text-sm leading-6 text-espresso/60">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] bg-espresso p-8 text-parchment shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-marigold">Connection score</p>
            <p className="mt-4 max-w-3xl font-display text-3xl leading-snug">
              &ldquo;The Q2 New Hire Circle program reached a 78 connection score, with 84% of participants saying
              they felt more connected at work.&rdquo;
            </p>
            <p className="mt-4 text-sm text-parchment/55">
              A single proprietary metric HR teams can report internally to demonstrate program ROI.
            </p>
          </div>
        </section>

        {/* Employee experience */}
        <section className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8">
          <SectionTitle eyebrow="Employee experience" title="Calm, lightweight, and distraction-free." />
          <div className="grid gap-4 text-left md:grid-cols-3">
            {[
              { label: "No social feed", desc: "Employees see their circle, upcoming gatherings, and RSVPs. Nothing else." },
              { label: "No awkward browsing", desc: "There are no public employee profiles. Circles are private by design." },
              { label: "No forced fun", desc: "Low-pressure formats mean employees show up because they want to, not because they have to." },
            ].map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
                <h3 className="font-display text-2xl text-espresso">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-espresso/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
          <h2 className="font-display text-5xl tracking-tight text-espresso">Ready to launch your first circle?</h2>
          <p className="mt-5 text-lg leading-8 text-espresso/64">
            Start an employer pilot and see what recurring employee connection feels like when it&apos;s actually measured.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/for-employers" variant="secondary">For employers</Button>
          </div>
        </section>
      </main>
    </>
  );
}
