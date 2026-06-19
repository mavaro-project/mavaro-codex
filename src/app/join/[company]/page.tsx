import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import Image from "next/image";

export default async function JoinPage({ params }: { params: Promise<{ company: string }> }) {
  const { company } = await params;
  const companyName = company
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="rounded-[2.5rem] border border-espresso/10 bg-white/75 p-8 shadow-soft md:p-12">
          <div className="mb-8 flex items-center gap-4">
            <Image
              src="/brand/mavaro-icon-transparent.png"
              alt="Mavaro"
              width={48}
              height={48}
              className="h-10 w-auto object-contain"
            />
            <div className="h-7 w-px bg-espresso/15" />
            <p className="text-sm font-semibold text-espresso">{companyName}</p>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.26em] text-terracotta">You&apos;ve been invited</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-espresso">
            Join the {companyName} employee circle program.
          </h1>
          <p className="mt-5 leading-8 text-espresso/65">
            {companyName} uses Mavaro to run recurring small-group connection programs for employees. Complete a
            short profile and you&apos;ll be matched into a curated circle based on your team, availability, and
            connection goals.
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-oat/70 p-5 text-sm leading-7 text-espresso/68">
            <p className="font-semibold text-espresso">What to expect</p>
            <ul className="mt-2 space-y-1">
              <li>• Complete a short onboarding profile (about 3 minutes)</li>
              <li>&bull; Get matched into a circle of 5&ndash;10 colleagues</li>
              <li>• RSVP to recurring low-pressure gatherings</li>
              <li>• Share feedback after each session</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/employee/signup">Create employee account</Button>
            <Button href="/employee/login" variant="secondary">Already have an account?</Button>
          </div>
        </div>
      </main>
    </>
  );
}
