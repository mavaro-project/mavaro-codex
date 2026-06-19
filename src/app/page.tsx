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
  { label: "Avg. session rating", value: "4.6/5" },
  { label: "Connection score", value: "78" },
];

const adminBullets = [
  "Launch New Hire and Hybrid Connection Circles",
  "Match employees into recurring small groups",
  "Track RSVPs, attendance, and feedback",
  "Measure belonging and connection quality",
];

const employeeBullets = [
  "Complete your employee profile",
  "Join a curated circle",
  "RSVP to upcoming gatherings",
  "Share feedback after each session",
];

const useCases = [
  "New Hire Circles",
  "Hybrid Office-Day Circles",
  "Cross-Team Lunch Circles",
  "Manager Peer Circles",
  "ERG Circles",
  "Wellness Circles",
  "City/Office Hub Circles",
  "Culture & Belonging Circles",
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-terracotta">Mavaro for People teams</p>
            <h1 className="font-display text-6xl leading-[0.92] tracking-tight text-espresso md:text-8xl">
              Build real employee connection beyond Slack and happy hours.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-espresso/68">
              Mavaro helps companies create recurring small-group circles that strengthen onboarding, hybrid culture,
              and workplace belonging.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/admin/request-access">Start an Employer Pilot</Button>
              <Button href="/employee/login" variant="secondary">Employee Login</Button>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[3rem] bg-espresso p-6 text-parchment shadow-soft subtle-grid">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-terracotta/35 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-marigold/30 blur-3xl" />
            <div className="absolute right-6 top-6 z-20 hidden rounded-[2rem] bg-white/95 p-3 shadow-card md:block">
              <Image
                src="/brand/mavaro-icon-transparent.png"
                alt=""
                width={120}
                height={122}
                className="h-20 w-auto object-contain"
                aria-hidden="true"
              />
            </div>
            <div className="relative z-10 grid h-full content-between gap-6">
              <div className="rounded-[2rem] bg-parchment/10 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.24em] text-sand/70">Program forming</p>
                <h2 className="mt-4 font-display text-5xl">Hybrid Wednesday Circle</h2>
                <p className="mt-3 text-parchment/65">8 employees · cross-team lunch · NYC office hub</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["RSVP rate", "74%"],
                  ["Would attend again", "82%"],
                  ["Avg. rating", "4.6/5"],
                  ["Connection score", "88"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] bg-parchment/10 p-5 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-sand/60">{label}</p>
                    <p className="mt-3 font-display text-4xl">{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[2rem] bg-parchment p-5 text-espresso">
                <p className="text-sm font-semibold">Upcoming session</p>
                <p className="mt-2 font-display text-3xl">Cross-Team Lunch Circle</p>
                <p className="mt-2 text-sm leading-6 text-espresso/60">
                  A hosted lunch for hybrid employees who want stronger cross-team context.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <RoleCard
              eyebrow="Company Admin"
              title="Manage Employee Connection"
              subtitle="For People, HR, Workplace, Culture, and Employee Experience teams."
              bullets={adminBullets}
              primaryHref="/admin/request-access"
              primaryLabel="Start an Employer Pilot"
              secondaryHref="/admin/login"
              secondaryLabel="Admin Login"
              featured
            />
            <RoleCard
              eyebrow="Employee"
              title="Join Your Employee Circle"
              subtitle="For employees invited by their company to join a Mavaro Circle."
              bullets={employeeBullets}
              primaryHref="/employee/login"
              primaryLabel="Employee Login"
              secondaryHref="/employee/signup"
              secondaryLabel="Join with Invite"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="Connection programs" title="Built for the moments where workplace belonging is won or lost.">
            Mavaro turns HR intent into recurring employee circles with measurable participation and feedback.
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase) => (
              <div key={useCase} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
                <h3 className="font-display text-3xl text-espresso">{useCase}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Sample circle */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle eyebrow="A Mavaro circle" title="Eight people. One shared program. Real connection.">
            This is what a cross-team Hybrid Wednesday Circle looks like at a 342-person company.
          </SectionTitle>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {sampleCircle.map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-3 text-center">
                <div className="relative">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover shadow-card ring-4 ring-white"
                  />
                  <div className="absolute inset-0 rounded-full ring-2 ring-terracotta/20" />
                </div>
                <div>
                  <p className="font-semibold text-espresso">{person.name}</p>
                  <p className="text-xs text-espresso/50">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust metrics bar */}
        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="glass rounded-[2rem] px-6 py-7 shadow-card">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.26em] text-espresso/40">Program benchmark metrics</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {trustMetrics.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-4xl text-espresso">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-espresso/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
          <h2 className="font-display text-5xl tracking-tight text-espresso md:text-6xl">
            Build connection programs your employees will actually show up for.
          </h2>
          <p className="mt-5 text-lg leading-8 text-espresso/64">
            Mavaro is built for real workplace connection — not another feed, chat, or forced happy hour.
            Start an employer pilot and measure belonging from week one.
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

function RoleCard({
  eyebrow,
  title,
  subtitle,
  bullets,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  featured = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  featured?: boolean;
}) {
  return (
    <div className={`rounded-[2.5rem] p-7 shadow-card ${featured ? "bg-espresso text-parchment" : "bg-white/75 text-espresso"}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.24em] ${featured ? "text-marigold" : "text-terracotta"}`}>{eyebrow}</p>
      <h2 className="mt-4 font-display text-5xl">{title}</h2>
      <p className={`mt-4 leading-7 ${featured ? "text-parchment/70" : "text-espresso/64"}`}>{subtitle}</p>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className={`rounded-2xl px-4 py-3 text-sm ${featured ? "bg-parchment/10" : "bg-oat/70"}`}>
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button href={primaryHref} variant={featured ? "secondary" : "primary"} className={featured ? "bg-parchment text-espresso" : ""}>
          {primaryLabel}
        </Button>
        <Button href={secondaryHref} variant="secondary" className={featured ? "border-parchment/20 text-parchment" : ""}>
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}
