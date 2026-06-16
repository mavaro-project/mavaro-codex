import { Header } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">Privacy</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Employee privacy is part of the product.</h1>
        <p className="mt-5 leading-8 text-espresso/68">
          Mavaro’s MVP keeps sensitive employee notes out of admin-facing circle views and uses company-scoped access
          controls when Supabase is configured. Formal privacy documentation should be reviewed before production launch.
        </p>
      </main>
    </>
  );
}
