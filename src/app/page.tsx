import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";

const sampleCircle = [
  { name: "Farid", role: "Marketing", photo: "https://i.pravatar.cc/150?img=13" },
  { name: "Maya", role: "Product", photo: "https://i.pravatar.cc/150?img=44" },
  { name: "Julian", role: "Engineering", photo: "https://i.pravatar.cc/150?img=52" },
  { name: "Nora", role: "People", photo: "https://i.pravatar.cc/150?img=5" },
  { name: "Ari", role: "Marketing", photo: "https://i.pravatar.cc/150?img=59" },
  { name: "Sofia", role: "Design", photo: "https://i.pravatar.cc/150?img=47" },
  { name: "Leo", role: "Data", photo: "https://i.pravatar.cc/150?img=12" },
  { name: "Imani", role: "Customer Success", photo: "https://i.pravatar.cc/150?img=38" },
];

const trustMetrics = [
  { label: "RSVP rate", value: "76%" },
  { label: "Felt more connected", value: "81%" },
  { label: "Would attend again", value: "84%" },
  { label: "Avg. session rating", value: "4.6 / 5" },
  { label: "Connection score", value: "78" },
];

const features = [
  {
    color: "bg-terracotta/10 text-terracotta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="3" /><circle cx="3.5" cy="6" r="2" /><circle cx="20.5" cy="6" r="2" />
        <circle cx="3.5" cy="18" r="2" /><circle cx="20.5" cy="18" r="2" />
        <path d="M5.5 7 10 10.5M14 10.5l4.5-3.5M5.5 17 10 13.5M14 13.5l4.5 3.5" />
      </svg>
    ),
    title: "Curated matching",
    body: "Groups built from availability, work mode, department, goals, and location — not random assignment or who sits nearby.",
  },
  {
    color: "bg-marigold/12 text-bronze",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    title: "Recurring rhythm",
    body: "Circles meet on a set cadence. Repeated interactions build the trust and familiarity that a one-off event never can.",
  },
  {
    color: "bg-sage/20 text-teal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "In-person first",
    body: "Lunches, walks, coffee chats. Every Mavaro format is designed for the kind of low-pressure, face-to-face connection that builds real bonds.",
  },
  {
    color: "bg-navy/8 text-navy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M18 20V10M12 20V4M6 20v-6" /><path d="M2 20h20" />
      </svg>
    ),
    title: "Measurable belonging",
    body: "Post-session feedback becomes a connection score HR can track over time and actually report to leadership.",
  },
];

const whyItMatters = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-terracotta">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    stat: "2 in 10",
    body: "employees have a best friend at work — yet those who do show measurably higher engagement, productivity, and retention.",
    source: "Gallup",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-terracotta">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    stat: "Named essential",
    body: "of workplace mental health by the U.S. Surgeon General, who calls out hybrid work as making intentional connection more critical than ever.",
    source: "U.S. Surgeon General",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-terracotta">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    stat: "75%",
    body: "of desk workers are already using AI at work. As digital work accelerates, in-person human connection becomes the real differentiator.",
    source: "Microsoft / LinkedIn",
  },
];

const useCases = [
  "New Hire Circles",
  "Hybrid Office-Day Circles",
  "Cross-Team Lunch Circles",
  "Manager Peer Circles",
  "ERG Circles",
  "Wellness Circles",
  "City / Office Hub Circles",
  "Culture & Belonging Circles",
];

export default function Home() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-4 pt-16 text-center md:px-8 md:pt-24">
          <p className="mb-6 inline-block rounded-full border border-terracotta/20 bg-terracotta/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.28em] text-terracotta">
            Mavaro for People teams
          </p>
          <h1 className="font-display text-6xl leading-[0.92] tracking-tight text-espresso md:text-7xl lg:text-[5.5rem]">
            Turn office days into connection days.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-espresso/58">
            Work is becoming more automated, digital, and distributed. Human connection has to become more intentional.
            Mavaro gives HR and People teams a structured way to launch recurring employee circles — and measure whether it&apos;s working.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/how-it-works" variant="secondary">See how it works</Button>
          </div>

          {/* Decorative connection visual */}
          <div className="relative mx-auto mt-14 h-24 w-full max-w-lg select-none" aria-hidden="true">
            <svg viewBox="0 0 480 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              {/* Connecting lines */}
              <line x1="60" y1="48" x2="150" y2="48" stroke="#E8604C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3"/>
              <line x1="150" y1="48" x2="240" y2="48" stroke="#E8604C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3"/>
              <line x1="240" y1="48" x2="330" y2="48" stroke="#E8604C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3"/>
              <line x1="330" y1="48" x2="420" y2="48" stroke="#E8604C" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3"/>
              {/* Cross connections */}
              <line x1="60" y1="48" x2="240" y2="48" stroke="#E8604C" strokeWidth="0.5" strokeOpacity="0.15"/>
              <line x1="150" y1="48" x2="330" y2="48" stroke="#E8604C" strokeWidth="0.5" strokeOpacity="0.15"/>
              <line x1="240" y1="48" x2="420" y2="48" stroke="#E8604C" strokeWidth="0.5" strokeOpacity="0.15"/>
              {/* Nodes */}
              {[60, 150, 240, 330, 420].map((cx, i) => (
                <g key={cx}>
                  <circle cx={cx} cy="48" r="20" fill="white" stroke="#E8604C" strokeWidth={i === 2 ? "2" : "1"} strokeOpacity={i === 2 ? "0.6" : "0.25"}/>
                  <circle cx={cx} cy="48" r={i === 2 ? "10" : "7"} fill="#E8604C" fillOpacity={i === 2 ? "0.18" : "0.1"}/>
                </g>
              ))}
              {/* Center pulse */}
              <circle cx="240" cy="48" r="28" stroke="#E8604C" strokeWidth="1" strokeOpacity="0.1"/>
            </svg>
            <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-espresso/28">Employees connected intentionally</p>
          </div>
        </section>

        {/* ── Sample circle avatars ─────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-espresso/35">
            A sample Mavaro circle — 8 colleagues matched by goals, availability, and work context
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {sampleCircle.map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-2.5 text-center">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-full object-cover shadow-card ring-[3px] ring-white"
                />
                <div>
                  <p className="text-sm font-semibold text-espresso">{person.name}</p>
                  <p className="text-xs text-espresso/45">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Metrics bar ──────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <div className="glass rounded-[2rem] px-8 py-7 shadow-card">
            <div className="flex flex-wrap items-center justify-center gap-8 divide-x divide-espresso/8 md:gap-0">
              {trustMetrics.map(({ label, value }) => (
                <div key={label} className="px-8 text-center first:pl-0 last:pr-0">
                  <p className="font-display text-4xl text-espresso">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-espresso/45">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ───────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="How Mavaro works" title="Connection that repeats, compounds, and measures.">
            Four pillars that turn a People team&apos;s intention into real workplace belonging.
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ color, icon, title, body }) => (
              <div key={title} className="rounded-[2rem] border border-espresso/8 bg-white p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                  {icon}
                </div>
                <h3 className="mt-5 font-semibold text-espresso">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-espresso/58">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Product preview (admin dashboard) ────────────── */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <div className="overflow-hidden rounded-[3rem] bg-espresso shadow-soft">
            <div className="subtle-grid relative px-8 py-10 md:px-12 md:py-12">
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-terracotta/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-marigold">Admin dashboard preview</p>
                <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">

                  {/* Left: circle card + upcoming session */}
                  <div className="space-y-4">
                    <div className="rounded-[2rem] bg-white/8 p-6 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.2em] text-parchment/45">Active program</p>
                      <h2 className="mt-3 font-display text-4xl text-parchment">Hybrid Wednesday Circle</h2>
                      <p className="mt-2 text-sm text-parchment/50">Cross-team lunch · NYC hub · 8 employees</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {sampleCircle.map((p) => (
                          <div key={p.name} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
                            <Image src={p.photo} alt={p.name} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
                            <span className="text-xs text-parchment/80">{p.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[2rem] bg-parchment p-6 text-espresso">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso/45">Upcoming session</p>
                      <p className="mt-2 font-display text-3xl">Cross-Team Lunch Circle</p>
                      <p className="mt-1.5 text-sm text-espresso/55">Tuesday Jun 24 · 12:30 pm · 8th floor lounge</p>
                      <div className="mt-4 flex gap-2">
                        {["Going", "Maybe", "Can't go"].map((label) => (
                          <span key={label} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${label === "Going" ? "border-terracotta bg-terracotta text-white" : "border-espresso/12 text-espresso/50"}`}>
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: metric tiles */}
                  <div className="grid grid-cols-2 content-start gap-3">
                    {[
                      ["RSVP rate", "74%"],
                      ["Attend again", "82%"],
                      ["Avg. rating", "4.6/5"],
                      ["Connection score", "88"],
                      ["Felt connected", "79%"],
                      ["Active circles", "11"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1.5rem] bg-white/8 p-4 backdrop-blur">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-parchment/40">{label}</p>
                        <p className="mt-2 font-display text-3xl text-parchment">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Before / After ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="grid gap-3 md:grid-cols-2">
            {/* Without */}
            <div className="rounded-[2.5rem] border border-espresso/8 bg-white p-8 shadow-card">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-espresso/35">Without a connection program</p>
              <ul className="space-y-4">
                {[
                  "Forced happy hours nobody wants to attend",
                  "Engagement surveys that go nowhere",
                  "New hires left to network on their own",
                  "Slack channels with zero real connection",
                  "Belonging you hope happens by accident",
                  "No way to measure whether culture is working",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-espresso/50">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-espresso/6 text-[11px] text-espresso/30">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Mavaro */}
            <div className="rounded-[2.5rem] bg-terracotta p-8 shadow-soft">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-white/50">With Mavaro</p>
              <ul className="space-y-4">
                {[
                  "Recurring small-group circles with real purpose",
                  "Employees matched by context, goals, and availability",
                  "New hires placed in a circle from day one",
                  "Low-pressure in-person formats people actually show up for",
                  "Belonging that's structured, rhythmic, and repeatable",
                  "A connection score HR can track and report",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Why it matters ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-espresso p-10 shadow-soft md:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-marigold">Why it matters</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-parchment md:text-5xl">
              Connection is a workplace essential — not a nice-to-have.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {whyItMatters.map(({ icon, stat, body, source }) => (
                <div key={stat} className="rounded-[1.5rem] bg-white/8 p-6 backdrop-blur">
                  <div className="mb-4">{icon}</div>
                  <p className="font-display text-4xl text-terracotta">{stat}</p>
                  <p className="mt-3 text-sm leading-7 text-parchment/65">{body}</p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-parchment/30">{source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases grid ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Connection programs" title="Built for every stage of the employee journey.">
            Eight ready-to-launch templates for new hires, hybrid teams, ERGs, managers, and more. Each with a recommended cadence, format, and measurement goal.
          </SectionTitle>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((label) => (
              <div
                key={label}
                className="group rounded-[2rem] border border-espresso/8 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-transparent hover:bg-terracotta hover:shadow-soft"
              >
                <h3 className="font-display text-2xl leading-tight text-espresso group-hover:text-white">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ── Who is Mavaro for ────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Admin card */}
            <div className="rounded-[2.5rem] bg-espresso p-8 text-parchment shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-marigold">Company admin</p>
              <h2 className="mt-4 font-display text-5xl">Connection infrastructure for People teams.</h2>
              <p className="mt-4 leading-7 text-parchment/65">
                Mavaro turns connection from a one-off event into a repeatable, measurable workplace program — for HR, Workplace, Culture, and Employee Experience teams.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Launch circles for new hires, hybrid teams, ERGs, and managers",
                  "Match employees into curated groups — not random pairings",
                  "Track RSVPs, attendance, and post-session feedback",
                  "Measure belonging with a reportable connection score",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-parchment/75">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-terracotta text-[10px] text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/admin/request-access" variant="secondary" className="bg-parchment text-espresso hover:bg-sand">
                  Start an Employer Pilot
                </Button>
                <Button href="/admin/login" variant="secondary" className="border-parchment/20 text-parchment hover:bg-parchment/10">
                  Admin Login
                </Button>
              </div>
            </div>

            {/* Employee card */}
            <div className="rounded-[2.5rem] border border-espresso/8 bg-white p-8 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Employee</p>
              <h2 className="mt-4 font-display text-5xl text-espresso">Your circle is waiting.</h2>
              <p className="mt-4 leading-7 text-espresso/60">
                Invited by your company to join a Mavaro circle? Complete a short profile, get matched into a curated group, and show up. That&apos;s it.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Complete a 3-minute employee profile",
                  "Get matched into a curated small-group circle",
                  "RSVP to upcoming in-person gatherings",
                  "Share feedback and build your connection score",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-espresso/70">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/12 text-[10px] text-terracotta">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/employee/login">Employee Login</Button>
                <Button href="/employee/signup" variant="secondary">Join with Invite</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <h2 className="font-display text-5xl leading-[0.94] tracking-tight text-espresso md:text-6xl">
            Build the human layer of your workplace.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-espresso/55">
            Mavaro is workplace connection infrastructure for the hybrid and AI era — warm, intentional, and built to repeat.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/for-employers" variant="secondary">For employers</Button>
          </div>
        </section>

      </main>
    </>
  );
}
