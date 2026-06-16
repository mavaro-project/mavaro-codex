"use client";

import { useState } from "react";
import { Button } from "./Button";
import { savePilotLead } from "@/lib/storage";
import { persistenceUsesSupabase } from "@/lib/persistence";

const companySizes = ["1-50", "51-200", "201-500", "501-1,000", "1,001-5,000", "5,000+"];
const primaryGoals = [
  "New hire onboarding",
  "Hybrid employee connection",
  "Employee engagement",
  "ERG programming",
  "Manager peer support",
  "Return-to-office programming",
  "Wellness/belonging",
  "Other",
];
const workplaceModels = ["Mostly in office", "Hybrid", "Mostly remote", "Distributed with office hubs"];

export function PilotForm() {
  const [submitted, setSubmitted] = useState(false);
  const [savedMode, setSavedMode] = useState<"supabase" | "demo">("demo");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    companySize: "201-500",
    city: "",
    title: "",
    primaryGoal: "Hybrid employee connection",
    workplaceModel: "Hybrid",
    message: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    if (persistenceUsesSupabase()) {
      const response = await fetch("/api/pilot-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { error?: string };
      setPending(false);

      if (!response.ok) {
        setError(result.error ?? "The employer pilot request could not be saved.");
        return;
      }

      setSavedMode("supabase");
      setSubmitted(true);
      return;
    }

    const saved = savePilotLead({ ...form, createdAt: new Date().toISOString() });
    setPending(false);
    if (!saved) {
      setError("This browser blocked local demo storage. Please try again in a standard browser window.");
      return;
    }

    setSavedMode("demo");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-marigold/30 bg-white/75 p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          Employer pilot request saved {savedMode === "demo" ? "in demo mode" : "securely"}
        </p>
        <h3 className="mt-3 font-display text-3xl text-espresso">Thanks — we received your employer pilot request.</h3>
        <p className="mt-3 leading-7 text-espresso/68">
          {savedMode === "demo"
            ? "This request is stored in this browser until Supabase is configured."
            : "The Mavaro team will review your company and follow up."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-espresso/10 bg-white/75 p-5 shadow-card md:grid-cols-2">
      <div>
        <label className="label" htmlFor="pilot-full-name">Full name</label>
        <input id="pilot-full-name" className="input" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="pilot-work-email">Work email</label>
        <input id="pilot-work-email" className="input" required type="email" value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="pilot-company-name">Company name</label>
        <input id="pilot-company-name" className="input" required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="pilot-company-size">Company size</label>
        <select id="pilot-company-size" className="input" value={form.companySize} onChange={(e) => update("companySize", e.target.value)}>
          {companySizes.map((size) => <option key={size}>{size}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="pilot-city">City / office location</label>
        <input id="pilot-city" className="input" required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="New York, Austin, London..." />
      </div>
      <div>
        <label className="label" htmlFor="pilot-title">Role / title</label>
        <input id="pilot-title" className="input" required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="VP People, Head of Workplace..." />
      </div>
      <div>
        <label className="label" htmlFor="pilot-primary-goal">Primary goal</label>
        <select id="pilot-primary-goal" className="input" value={form.primaryGoal} onChange={(e) => update("primaryGoal", e.target.value)}>
          {primaryGoals.map((goal) => <option key={goal}>{goal}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="pilot-workplace-model">Current workplace model</label>
        <select id="pilot-workplace-model" className="input" value={form.workplaceModel} onChange={(e) => update("workplaceModel", e.target.value)}>
          {workplaceModels.map((model) => <option key={model}>{model}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label" htmlFor="pilot-message">Message</label>
        <textarea id="pilot-message" className="input min-h-28" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us which employee connection program you want to launch first." />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Saving request..." : "Start an Employer Pilot"}
        </Button>
        {error ? <p className="mt-3 text-sm text-wine" role="alert">{error}</p> : null}
      </div>
    </form>
  );
}
