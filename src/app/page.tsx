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
            Build real employee connection beyond Slack and happy hours.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-espresso/58">
            Mavaro helps HR and People teams launch recurring small-group circles that strengthen
            onboarding, hybrid culture, and workplace belonging — then measures whether it&apos;s working.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/admin/request-access">Start an Employer Pilot</Button>
            <Button href="/how-it-works" variant="secondary">See how it works</Button>
          </div>
        </section>

        {/* ── Sample circle avatars ─────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-espresso/35">
            A sample Mavaro circle — 8 colleagues, one shared program
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

        {/* ── Product preview (admin dashboard) ────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
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
                            <Image
                              src={p.photo}
                              alt={p.name}
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded-full object-cover"
                            />
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

        {/* ── Use cases grid ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Connection programs" title="Built for the moments where belonging is won or lost.">
            Eight ready-to-launch program templates. Each with a recommended cadence, format, and measurement goal.
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
              <h2 className="mt-4 font-display text-5xl">Manage employee connection.</h2>
              <p className="mt-4 leading-7 text-parchment/65">
                For People, HR, Workplace, Culture, and Employee Experience teams.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Launch New Hire and Hybrid Connection Circles",
                  "Match employees into curated small groups",
                  "Track RSVPs, attendance, and feedback",
                  "Measure belonging with a connection score",
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
              <h2 className="mt-4 font-display text-5xl text-espresso">Join your employee circle.</h2>
              <p className="mt-4 leading-7 text-espresso/60">
                For employees invited by their company to join a Mavaro Circle.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Complete your employee profile",
                  "Get matched into a curated circle",
                  "RSVP to upcoming gatherings",
                  "Share feedback after each session",
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
            Connection your employees will actually show up for.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-espresso/55">
            Mavaro is built for real workplace connection — not another feed, chat, or forced happy hour.
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
