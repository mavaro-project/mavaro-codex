"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import {
  loadMemberExperience,
  persistFeedback,
  persistRsvp,
  type MemberExperience,
} from "@/lib/persistence";
import type { RSVPStatus } from "@/lib/types";

const emptyExperience: MemberExperience = {
  mode: "demo",
  profile: null,
  circle: null,
  events: [],
  rsvps: {},
};

export function DashboardClient() {
  const [experience, setExperience] = useState<MemberExperience>(emptyExperience);
  const [loaded, setLoaded] = useState(false);
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [rating, setRating] = useState(5);
  const [helpedConnection, setHelpedConnection] = useState(true);
  const [meetAgain, setMeetAgain] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    loadMemberExperience()
      .then(setExperience)
      .catch(() => setStorageError("Mavaro could not load your circle right now."))
      .finally(() => setLoaded(true));
  }, []);

  const { profile, circle, events, rsvps, mode } = experience;
  const firstName = profile?.name.split(" ")[0] || "there";
  const nextEvent = events[0] ?? null;
  const feedbackMembers = circle?.members.filter((member) => member.id !== profile?.id) ?? [];

  async function updateRsvp(status: RSVPStatus) {
    if (!nextEvent) return;
    const error = await persistRsvp(nextEvent.id, status);

    if (!error) {
      setStorageError("");
      setExperience((current) => ({
        ...current,
        rsvps: { ...current.rsvps, [nextEvent.id]: status },
      }));
    } else {
      setStorageError(error);
    }
  }

  function toggleMeetAgain(id: string) {
    setMeetAgain((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function submitFeedback() {
    if (!nextEvent) return;

    const error = await persistFeedback({
      id: `feedback-${Date.now()}`,
      eventId: nextEvent.id,
      userId: profile?.id ?? "demo-user",
      rating,
      wouldAttendAgain: rating >= 4,
      helpedWorkplaceConnection: helpedConnection,
      peopleTheyWouldMeetAgain: meetAgain,
      comment,
    });

    if (!error) {
      setStorageError("");
      setFeedbackSaved(true);
    } else {
      setStorageError(error);
    }
  }

  if (!loaded) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="rounded-[2.5rem] bg-espresso p-10 text-parchment shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand/70">Employee dashboard</p>
          <h1 className="mt-5 font-display text-5xl">Preparing your circle.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <section className="grid gap-6 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] bg-espresso p-8 text-parchment shadow-soft md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand/70">Employee dashboard</p>
          <h1 className="mt-5 font-display text-5xl tracking-tight md:text-6xl">Welcome, {firstName}.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-parchment/72">
            {circle
              ? "Your Mavaro circle is gathering around a repeat rhythm of thoughtful, low-pressure workplace connection."
              : "We’re forming your first employee circle. You’ll see your circle and upcoming gatherings here once your company launches the next Mavaro program."}
          </p>
          {!profile ? (
            <Button href="/employee/onboarding" variant="secondary" className="mt-7 bg-parchment text-espresso">
              Complete employee profile
            </Button>
          ) : null}
          {profile ? (
            <div className="mt-7 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-parchment/10 px-3 py-1">{profile.company ?? "Company pending"}</span>
              <span className="rounded-full bg-parchment/10 px-3 py-1">{formatTag(profile.workMode ?? "hybrid")}</span>
              <span className="rounded-full bg-parchment/10 px-3 py-1">{profile.department || "Team pending"}</span>
            </div>
          ) : null}
        </div>

        <div className="glass rounded-[2.5rem] p-7 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">Your circle</p>
          {circle ? (
            <>
              <h2 className="mt-4 font-display text-4xl text-espresso">{circle.name}</h2>
              <p className="mt-3 leading-7 text-espresso/64">{circle.programType ?? circle.theme}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="pill">{circle.members.length} employees</span>
                <span className="pill">{circle.durationWeeks}-week rhythm</span>
                <span className="pill">{profile?.company ?? "Company"}</span>
                <span className="pill">{circle.officeCity ?? profile?.city ?? "Office hub"}</span>
                {circle.score ? <span className="pill">Connection score {circle.score}</span> : null}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {circle.members.slice(0, 8).map((member) => (
                  <div key={member.id} className="flex items-center gap-3 rounded-2xl border border-espresso/10 bg-white/65 p-3">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-white shadow-card"
                      />
                    ) : (
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-xs font-semibold text-terracotta ring-2 ring-white">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-espresso">{member.name.split(" ")[0]}</p>
                      <p className="mt-0.5 truncate text-xs text-espresso/55">{member.department ?? "Employee"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-espresso/20 p-7 text-espresso/60">
              Circle placement is pending. You will see your program, upcoming sessions, and privacy-safe employee list here once approved.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Upcoming gathering</p>
          {nextEvent ? (
            <>
              <h2 className="mt-4 font-display text-4xl text-espresso">{nextEvent.title}</h2>
              <p className="mt-3 text-espresso/64">{nextEvent.description}</p>
              <div className="mt-5 space-y-2 text-sm text-espresso/70">
              <p><strong>Company:</strong> {profile?.company ?? "Mavaro company"}</p>
              <p><strong>Location:</strong> {nextEvent.location}</p>
              <p><strong>Time:</strong> {new Date(nextEvent.startTime).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {([
                  ["going", "Going"],
                  ["maybe", "Maybe"],
                  ["cant_go", "Can’t go"],
                ] as Array<[RSVPStatus, string]>).map(([status, label]) => (
                  <button
                    key={status}
                    onClick={() => updateRsvp(status)}
                    aria-pressed={rsvps[nextEvent.id] === status}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      rsvps[nextEvent.id] === status
                        ? "border-espresso bg-espresso text-parchment"
                        : "border-espresso/10 bg-white/60 text-espresso/70 hover:border-bronze"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 leading-7 text-espresso/60">Your next gathering will appear here once your company schedules the program.</p>
          )}
        </div>

        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Feedback loop</p>
          <h2 className="mt-4 font-display text-4xl text-espresso">Who would you meet again?</h2>
          <p className="mt-3 text-espresso/64">
            This helps your company understand whether the session improved workplace connection.
          </p>
          {nextEvent && circle ? (
            <>
              <div className="mt-6">
                <label className="label" htmlFor="event-rating">Rating</label>
                <input id="event-rating" className="w-full accent-espresso" min={1} max={5} type="range" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                <p className="mt-2 text-sm text-espresso/65">{rating} / 5</p>
              </div>
              <label className="mt-5 flex items-center gap-3 rounded-2xl bg-oat/70 p-4 text-sm font-semibold text-espresso">
                <input type="checkbox" checked={helpedConnection} onChange={(event) => setHelpedConnection(event.target.checked)} />
                This helped me feel more connected at work
              </label>
              <div className="mt-5 flex flex-wrap gap-2">
                {feedbackMembers.slice(0, 8).map((member) => (
                  <button
                    type="button"
                    key={member.id}
                    onClick={() => toggleMeetAgain(member.id)}
                    aria-pressed={meetAgain.includes(member.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      meetAgain.includes(member.id)
                        ? "border-espresso bg-espresso text-parchment"
                        : "border-espresso/10 bg-white/65 text-espresso/70 hover:border-terracotta"
                    }`}
                  >
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
                    ) : null}
                    {member.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <label className="label" htmlFor="feedback-note">Optional note</label>
                <textarea id="feedback-note" className="input min-h-24" value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>
              <Button type="button" onClick={submitFeedback} className="mt-5 w-full">
                Save feedback
              </Button>
              {feedbackSaved ? (
                <p className="mt-3 text-sm text-olive">
                Feedback saved {mode === "demo" ? "locally" : "to your account"}.
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-5 text-sm leading-6 text-espresso/55">Feedback opens after your first employee gathering is scheduled.</p>
          )}
          {storageError ? <p className="mt-3 text-sm text-wine" role="alert">{storageError}</p> : null}
        </div>
      </section>
    </main>
  );
}

function formatTag(tag: string) {
  return tag.replaceAll("_", " ");
}
