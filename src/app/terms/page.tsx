import { Header } from "@/components/Header";

const sections = [
  {
    title: "Pilot programs",
    body: "Mavaro employer pilots are structured programs for companies evaluating recurring employee connection programs. A pilot typically covers one program type (e.g. New Hire Circles), one cohort of employees, a defined number of sessions, and a reporting summary at close. Pilot terms, duration, and scope are agreed before launch.",
  },
  {
    title: "Company responsibilities",
    body: "The company admin agrees to use Mavaro in compliance with applicable employment law, including obtaining any required employee consent for data collection and circle participation. Mavaro circle participation should be voluntary for employees. Admins are responsible for ensuring that program content and formats are appropriate for the workplace.",
  },
  {
    title: "Employee accounts",
    body: "Employees create Mavaro accounts using their work email via a company-specific invite link. Employee accounts are tied to a company workspace and are not transferable between companies. Employees may request account deletion at any time.",
  },
  {
    title: "Data ownership",
    body: "Companies own their employee data within Mavaro. Mavaro does not claim ownership of employee profile data, feedback responses, or company analytics. Mavaro retains the right to use anonymized, aggregated, non-identifiable data to improve the matching engine and platform.",
  },
  {
    title: "Acceptable use",
    body: "Mavaro may not be used to facilitate discrimination in circle formation, employee surveillance, performance management, or any other purpose inconsistent with building genuine workplace belonging. Misuse of the platform may result in pilot suspension.",
  },
  {
    title: "Limitation of liability",
    body: "Mavaro is provided as an MVP platform for pilot programs. The platform is provided as-is during the pilot period. Mavaro is not liable for indirect or consequential damages arising from platform use. Full service level agreements and liability terms are established prior to paid production deployments.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Terms</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Pilot-based terms for employer programs.</h1>
        <p className="mt-5 leading-8 text-espresso/68">
          Mavaro employer pilots are designed for companies evaluating recurring employee connection programs.
          These terms apply to pilot usage. Final legal terms, data processing agreements, and service levels
          are established before a paid production deployment.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
              <h2 className="font-display text-2xl text-espresso">{section.title}</h2>
              <p className="mt-3 leading-7 text-espresso/65">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-espresso/45">
          Last reviewed June 2025. These are pilot-phase terms and do not constitute a final commercial agreement.
        </p>
      </main>
    </>
  );
}
