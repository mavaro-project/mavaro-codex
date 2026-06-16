"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { interestOptions } from "@/lib/mockData";
import { saveMemberProfile } from "@/lib/persistence";
import type {
  Availability,
  PreferredFormat,
  RoleLevel,
  SocialGoal,
  Tenure,
  UserProfile,
  Vibe,
  WorkMode,
} from "@/lib/types";

const goalOptions: Array<{ value: SocialGoal; label: string }> = [
  { value: "cross_functional_colleagues", label: "Meet cross-functional colleagues" },
  { value: "feel_connected", label: "Feel more connected at work" },
  { value: "new_hire_onboarding", label: "New hire onboarding" },
  { value: "professional_peer_support", label: "Build professional peer support" },
  { value: "erg_circle", label: "Join an ERG circle" },
  { value: "wellness_balance", label: "Wellness and work-life balance" },
  { value: "manager_peer_support", label: "Manager peer support" },
  { value: "office_city_connection", label: "Explore the office/city with colleagues" },
];

const availabilityOptions: Array<{ value: Availability; label: string }> = [
  { value: "weekday_breakfast", label: "Weekday breakfast" },
  { value: "weekday_lunch", label: "Weekday lunch" },
  { value: "weekday_afternoon", label: "Weekday afternoon" },
  { value: "weekday_evening", label: "Weekday evening" },
  { value: "office_anchor_days", label: "Office anchor days" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

const formatOptions: Array<{ value: PreferredFormat; label: string }> = [
  { value: "coffee_chats", label: "Coffee chats" },
  { value: "lunch_circles", label: "Lunch circles" },
  { value: "walk_and_talks", label: "Walk-and-talks" },
  { value: "team_dinners", label: "Team dinners" },
  { value: "skill_career_circles", label: "Skill/career circles" },
  { value: "wellness_circles", label: "Wellness circles" },
  { value: "erg_circles", label: "ERG circles" },
  { value: "manager_peer_circles", label: "Manager peer circles" },
];

const vibeOptions: Array<{ value: Vibe; label: string }> = [
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Professional" },
  { value: "reflective", label: "Reflective" },
  { value: "active", label: "Active" },
  { value: "food_centered", label: "Food-centered" },
  { value: "career_focused", label: "Career-focused" },
  { value: "wellness_focused", label: "Wellness-focused" },
  { value: "culture_focused", label: "Culture-focused" },
];

export function OnboardingForm({
  authenticatedUserId,
  authenticatedEmail,
}: {
  authenticatedUserId: string | null;
  authenticatedEmail: string | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [storageError, setStorageError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: authenticatedEmail ?? "",
    company: "NovaWorks",
    city: "New York",
    department: "",
    roleLevel: "individual_contributor" as RoleLevel,
    workMode: "hybrid" as WorkMode,
    tenure: "new_hire" as Tenure,
    startDate: "",
    interests: [] as string[],
    socialGoals: [] as SocialGoal[],
    availability: [] as Availability[],
    preferredFormats: [] as PreferredFormat[],
    vibes: [] as Vibe[],
    managerStatus: false,
    ergInterests: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    notes: "",
  });

  const progress = useMemo(() => `${Math.round((step / 5) * 100)}%`, [step]);
  const stepIsValid = useMemo(() => {
    if (step === 1) return form.name.trim().length > 0 && form.email.includes("@") && form.company.trim().length > 0;
    if (step === 2) return form.department.trim().length > 0 && form.city.trim().length > 0;
    if (step === 3) return form.interests.length > 0 && form.socialGoals.length > 0;
    if (step === 4) return form.availability.length > 0 && form.preferredFormats.length > 0 && form.vibes.length > 0;
    return true;
  }, [form, step]);

  function update<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggle<T extends string>(
    field: "interests" | "socialGoals" | "availability" | "preferredFormats" | "vibes",
    value: T,
  ) {
    setForm((current) => {
      const list = current[field] as T[];
      return {
        ...current,
        [field]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  }

  async function submit() {
    setPending(true);
    const profile: UserProfile = {
      id: authenticatedUserId ?? `local-${Date.now()}`,
      name: form.name,
      email: form.email,
      ageRange: "",
      city: form.city,
      neighborhood: form.city,
      company: form.company,
      organizationId: "company-nova",
      organizationType: "employer",
      department: form.department,
      workMode: form.workMode,
      roleLevel: form.roleLevel,
      tenure: form.tenure,
      startDate: form.startDate || undefined,
      interests: form.interests,
      socialGoals: form.socialGoals,
      availability: form.availability,
      preferredFormats: form.preferredFormats,
      vibes: form.vibes,
      managerStatus: form.managerStatus,
      ergInterests: form.ergInterests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      dietaryRestrictions: form.dietaryRestrictions || undefined,
      accessibilityNeeds: form.accessibilityNeeds || undefined,
      notes: form.notes || undefined,
      preferredGroupSize: 8,
      onboardingCompleted: true,
      joinedAt: new Date().toISOString(),
    };

    const result = await saveMemberProfile(profile);
    setPending(false);

    if (result.ok) {
      setStorageError("");
      router.push("/employee/dashboard");
      router.refresh();
    } else {
      setStorageError(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2.25rem] border border-espresso/10 bg-white/75 p-5 shadow-soft md:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-espresso/50">
          <span>Step {step} of 5</span>
          <span>{progress}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-espresso/10">
          <div className="h-full rounded-full bg-marigold transition-all" style={{ width: progress }} />
        </div>
      </div>

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Employee profile</p>
            <h1 className="font-display text-4xl text-espresso">Tell Mavaro where you work.</h1>
            <p className="mt-3 text-espresso/64">Your company uses this to form thoughtful employee circles.</p>
          </div>
          <TextInput id="employee-name" label="Full name" value={form.name} onChange={(value) => update("name", value)} />
          <TextInput id="employee-email" label="Work email" type="email" value={form.email} onChange={(value) => update("email", value)} readOnly={Boolean(authenticatedEmail)} />
          <TextInput id="employee-company" label="Company" value={form.company} onChange={(value) => update("company", value)} />
          <TextInput id="employee-city" label="Office location or city" value={form.city} onChange={(value) => update("city", value)} />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Work context</p>
            <h2 className="font-display text-4xl text-espresso">Help the circle fit your work life.</h2>
          </div>
          <TextInput id="employee-department" label="Department / team" value={form.department} onChange={(value) => update("department", value)} />
          <div>
            <label className="label" htmlFor="employee-role-level">Role level</label>
            <select id="employee-role-level" className="input" value={form.roleLevel} onChange={(e) => update("roleLevel", e.target.value as RoleLevel)}>
              <option value="individual_contributor">Individual contributor</option>
              <option value="manager">Manager</option>
              <option value="senior_manager">Senior manager</option>
              <option value="director_plus">Director+</option>
              <option value="executive">Executive</option>
              <option value="early_career">Intern / early career</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="employee-work-mode">Work mode</label>
            <select id="employee-work-mode" className="input" value={form.workMode} onChange={(e) => update("workMode", e.target.value as WorkMode)}>
              <option value="mostly_in_office">Mostly in office</option>
              <option value="hybrid">Hybrid</option>
              <option value="mostly_remote">Mostly remote</option>
              <option value="remote_near_hub">Fully remote near office hub</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="employee-tenure">Start date or tenure</label>
            <select id="employee-tenure" className="input" value={form.tenure} onChange={(e) => update("tenure", e.target.value as Tenure)}>
              <option value="new_hire">New hire: 0-90 days</option>
              <option value="three_to_twelve_months">3-12 months</option>
              <option value="one_to_three_years">1-3 years</option>
              <option value="three_plus_years">3+ years</option>
            </select>
          </div>
          <TextInput id="employee-start-date" label="Start date (optional)" type="date" value={form.startDate} onChange={(value) => update("startDate", value)} />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-8">
          <ChoiceStep eyebrow="Interests" title="What would make a workday gathering worthwhile?" options={interestOptions.map((interest) => ({ value: interest, label: interest }))} selected={form.interests} onToggle={(value) => toggle("interests", value)} />
          <ChoiceStep eyebrow="Connection goals" title="What should this employee circle help with?" options={goalOptions} selected={form.socialGoals} onToggle={(value) => toggle("socialGoals", value)} />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-8">
          <ChoiceStep eyebrow="Availability" title="When can you realistically show up?" options={availabilityOptions} selected={form.availability} onToggle={(value) => toggle("availability", value)} />
          <ChoiceStep eyebrow="Format" title="What circle format would feel natural?" options={formatOptions} selected={form.preferredFormats} onToggle={(value) => toggle("preferredFormats", value)} />
          <ChoiceStep eyebrow="Vibe" title="What should the room feel like?" options={vibeOptions} selected={form.vibes} onToggle={(value) => toggle("vibes", value)} />
        </div>
      ) : null}

      {step === 5 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Optional preferences</p>
            <h2 className="font-display text-4xl text-espresso">Anything that helps Mavaro make the circle feel considered?</h2>
          </div>
          <label className="flex items-center gap-3 rounded-2xl bg-oat/70 p-4 text-sm font-semibold text-espresso">
            <input type="checkbox" checked={form.managerStatus} onChange={(e) => update("managerStatus", e.target.checked)} />
            I manage people
          </label>
          <TextInput id="employee-erg" label="ERG interest" value={form.ergInterests} onChange={(value) => update("ergInterests", value)} placeholder="Women at work, Pride, Parents..." />
          <TextInput id="employee-dietary" label="Dietary restrictions" value={form.dietaryRestrictions} onChange={(value) => update("dietaryRestrictions", value)} />
          <TextInput id="employee-accessibility" label="Accessibility needs" value={form.accessibilityNeeds} onChange={(value) => update("accessibilityNeeds", value)} />
          <div className="md:col-span-2">
            <label className="label" htmlFor="employee-notes">Notes / preferences</label>
            <textarea id="employee-notes" className="input min-h-24" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button type="button" variant="secondary" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>
          Back
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={() => setStep((current) => current + 1)} disabled={!stepIsValid}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={!stepIsValid || pending}>
            {pending ? "Saving your profile..." : "Go to Employee Dashboard"}
          </Button>
        )}
      </div>
      {step === 5 ? (
        <p className="mt-5 rounded-2xl bg-sage/15 p-4 text-sm leading-6 text-espresso/66">
          Your employee profile is ready. We’re forming your first Mavaro Circle with colleagues who share your goals,
          availability, and work context.
        </p>
      ) : null}
      {storageError ? <p className="mt-4 text-sm text-wine" role="alert">{storageError}</p> : null}
    </div>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <input id={id} className="input" type={type} value={value} readOnly={readOnly} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ChoiceStep<T extends string>({
  eyebrow,
  title,
  options,
  selected,
  onToggle,
}: {
  eyebrow: string;
  title: string;
  options: Array<{ value: T; label: string }>;
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">{eyebrow}</p>
      <h2 className="mb-6 font-display text-4xl text-espresso">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                isSelected
                  ? "border-espresso bg-espresso text-parchment shadow-card"
                  : "border-espresso/10 bg-white/70 text-espresso/70 hover:border-terracotta hover:text-espresso"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
