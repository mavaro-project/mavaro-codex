import { Button } from "./Button";

export function AccessDenied() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 md:px-8">
      <div className="rounded-[2.5rem] bg-espresso p-8 text-parchment shadow-soft md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand/70">Private company admin area</p>
        <h1 className="mt-5 font-display text-5xl">This account does not manage a Mavaro company workspace.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-parchment/70">
          Admin access is granted per company. Ask an existing owner to add this account to the employer workspace.
        </p>
        <Button href="/employee/dashboard" variant="secondary" className="mt-7 bg-parchment text-espresso">
          Return to employee dashboard
        </Button>
      </div>
    </main>
  );
}
