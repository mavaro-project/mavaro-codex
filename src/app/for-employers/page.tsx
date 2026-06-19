import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { SectionTitle } from "@/components/SectionTitle";

const valueProps = [
  {
    eyebrow: "Structured programs",
    title: "Connection circles that actually recur",
    body: "Happy hours and Slack channels fade. Mavaro creates recurring small-group programs with a cadence, purpose, and feedback loop — so belonging becomes a system, not a one-off.",
  },
  {
    eyebrow: "Smart matching",
    title: "Curated cohorts, not random pairings",
    body: "Mavaro's matching engine considers availability, office location, work mode, tenure, department, role level, and connection goals — and proposes circles your team wants to be in.",
  },
  {
    eyebrow: "Measurable belonging",
    title: "Metrics People teams can actually report",
    body: "Track RSVP rates, attendance, session ratings, repeat intent, and a proprietary connection score. Finally, an answer to: did this culture initiative actually work?",
  },
  {
    eyebrow: "Admin-first design",
    title: "Built for HR, not IT",
    body: "Admins create programs in minutes, generate circles with one click, review cohorts before launch, and see engagement across every program in a single dashboard.",
  },
];

const templates = [
  { label: "New Hire Circles", desc: "90-day onboarding cohorts that reduce early attrition and speed up belonging." },
  { label: "Hybrid Office-Day Circles", desc: "Make hybrid Wednesdays feel intentional instead of accidental." },
  { label: "Cross-Team Lunch Circles", desc: "Break silos by connecting people across departments at lunch." },
  { label: "Manager Peer Circles", desc: "Give managers a recurring peer support rhythm without the awkward calendar invite." },
  { label: "ERG Circles", desc: "Structured, recurring connection inside employee resource groups." },
  { label: "Wellness Circles", desc: "Walk-and-talks, mindfulness sessions, and peer support for mental well-being." },
  { label: "City / Office Hub Circles", desc: "Connect employees in the same city even when they don't share a team." },
  { label: "Culture & Belonging Circles", desc: "Intentional cross-functional gatherings focused on company culture and values." },
];

const metrics = [
  { label: "RSVP rate", value: "74–88%" },
  { label: "Would attend again", value: "82%" },
  { label: "Felt more connected", value: "79%" },
  { label: "Avg. session rating", value: "4.6/5" },
];

export default function ForEmployersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">For employers</p>
              <h1 className="mt-4 font-display text-6xl leading-[0.92] tracking-tight text-espresso md:text-7xl">
                Employee belonging programs your team can actually feel.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-espresso/68">
                Mavaro helps People, Workplace, and Employee Experience teams launch recurring circles for
                onboarding, hybrid culture, ERGs, manager support, and cross-team relationships — then measures
                whether it&apos;s working.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/admin/request-access">Start an Employer Pilot</Button>
                <Button href="/how-it-works" variant="secondary">See how it works</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map(({ label, value }) => (
                <div key={label} className="rounded-[2rem] border border-espresso/10 bg-white/75 p-6 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso/50">{label}</p>
                  <p className="mt-3 font-display text-4xl text-espresso">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Why Mavaro" title="Connection that compounds over time.">
            One-off events get forgotten. Recurring circles build real relationships — and Mavaro gives you the data to prove it.
          </SectionTitle>
          <div className="grid gap-5 md:grid-cols-2">
            {valueProps.map((card) => (
              <div key={card.title} className="rounded-[2.5rem] border border-espresso/10 bg-white/72 p-8 shadow-card">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">{card.eyebrow}</p>
                <h2 className="mt-4 font-display text-4xl text-espresso">{card.title}</h2>
                <p className="mt-4 leading-7 text-espresso/64">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Program templates */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Program templates" title="Ready-to-launch programs for every moment.">
            Admins don&apos;t start from scratch. Mavaro includes eight ready-to-launch program templates, each with recommended group sizes, cadences, event formats, and measurement goals.
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((t) => (
              <div key={t.label} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
                <h3 className="font-display text-2xl text-espresso">{t.label}</h3>
                <p className="mt-3 text-sm leading-6 text-espresso/60">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Admin workflow */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="rounded-[3rem] bg-espresso p-10 text-parchment shadow-soft md:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-marigold">Admin dashboard</p>
                <h2 className="mt-5 font-display text-5xl tracking-tight md:text-6xl">
                  Launch in a day. Measure from week one.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-parchment/68">
                  Create your company workspace, pick a program type, invite employees, and generate circles — all
                  in a single session. Mavaro tracks participation, gathers feedback, and surfaces your connection
                  score automatically.
                </p>
                <Button href="/admin/request-access" className="mt-8 bg-parchment text-espresso" variant="secondary">
                  Start an Employer Pilot
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Total employees onboarded", "84"],
                  ["Active circles", "11"],
                  ["RSVP rate", "76%"],
                  ["Felt more connected", "81%"],
                  ["Would attend again", "84%"],
                  ["Connection score", "78"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] bg-parchment/10 p-5 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.18em] text-sand/60">{label}</p>
                    <p className="mt-3 font-display text-3xl">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Mavaro is not */}
        <section className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8">
          <SectionTitle eyebrow="Focused product" title="Not another social app for work." />
          <div className="grid gap-4 text-left md:grid-cols-3">
            {[
              { label: "No social feed", body: "Mavaro is not LinkedIn or a community app. There's no public profile, no posts, no awkward browsing." },
              { label: "No DMs", body: "We don't create another messaging layer. Circles connect people in real life, not through chat." },
              { label: "No one-off events", body: "Happy hours and town halls are fine, but they don't build relationships. Mavaro is built for recurring rhythms." },
            ].map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
                <h3 className="font-display text-2xl text-espresso">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-espresso/60">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Ready to start?</p>
          <h2 className="mt-4 font-display text-5xl tracking-tight text-espresso md:text-6xl">
            Start an employer pilot today.
          </h2>
          <p className="mt-5 text-lg leading-8 text-espresso/64">
            Mavaro pilots are designed for HR, People, and Employee Experience teams that want to test recurring
            connection programs with a real cohort and measure whether belonging improves.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/how-it-works" variant="secondary">See how it works</Button>
          </div>
        </section>
      </main>
    </>
  );
}
