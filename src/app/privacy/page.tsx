import { Header } from "@/components/Header";

const sections = [
  {
    title: "What we collect",
    body: "Mavaro collects the information employees voluntarily provide during onboarding: name, work email, company, office location, department, role level, work mode, tenure, interests, availability, and connection preferences. We do not collect salary, performance data, or any government-issued identification.",
  },
  {
    title: "How it's used",
    body: "Employee profile data is used exclusively for circle matching — to propose small groups of colleagues with compatible availability, goals, and work context. Sensitive optional fields such as dietary restrictions, accessibility needs, and personal notes are used only for circle logistics and are never surfaced in company-facing analytics.",
  },
  {
    title: "Who can see what",
    body: "Company admins can view aggregate program analytics, attendance rates, and feedback scores. Individual employee feedback responses are anonymized in aggregate views. Admins can see which employees are assigned to which circles, but cannot view individual feedback tied to a specific person's name.",
  },
  {
    title: "Data storage and security",
    body: "When Supabase is configured, employee data is stored in a company-scoped workspace with row-level security policies that prevent cross-company data access. In demo mode, data is stored in browser local storage and is never transmitted to a server.",
  },
  {
    title: "Data retention",
    body: "Companies can request deletion of their workspace data at any time by contacting Mavaro. Individual employees can request removal of their profile. Mavaro does not sell, share, or license employee data to third parties.",
  },
  {
    title: "Contact",
    body: "For privacy inquiries, data deletion requests, or questions about how your information is used, contact the Mavaro team. Formal privacy documentation, a Data Processing Agreement, and GDPR/CCPA compliance documentation are available for production pilots.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Privacy</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Employee privacy is part of the product.</h1>
        <p className="mt-5 leading-8 text-espresso/68">
          Mavaro is built for employee connection, not employee surveillance. We collect only what&apos;s needed for
          circle matching, protect sensitive fields from admin views, and never sell employee data.
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
          Last reviewed June 2025. This is an MVP privacy overview and not a formal legal privacy policy.
          A complete privacy policy will be provided prior to production deployment.
        </p>
      </main>
    </>
  );
}
