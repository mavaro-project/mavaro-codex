import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { SectionTitle } from "@/components/SectionTitle";

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
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-marigold/35 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-terracotta/35 blur-3xl" />
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

        <section className="mx-auto max-w-5xl px-5 py-16 text-center md:px-8">
          <p className="rounded-[2rem] bg-sage/18 px-6 py-5 text-lg leading-8 text-espresso/72">
            Mavaro is built for real workplace connection — not another feed, chat, or forced happy hour.
          </p>
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
