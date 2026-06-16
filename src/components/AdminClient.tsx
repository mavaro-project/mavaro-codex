"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { KpiCard } from "./KpiCard";
import { calculateConnectionScore } from "@/lib/analytics/connectionScore";
import { generateCircleProposals } from "@/lib/matching/generateProposals";
import {
  loadAdminWorkspace,
  saveCircleProposals,
  type AdminWorkspace,
} from "@/lib/persistence";
import type { Circle } from "@/lib/types";

const emptyWorkspace: AdminWorkspace = {
  mode: "demo",
  organizations: [],
  users: [],
  circles: [],
  events: [],
  feedback: [],
  leadCount: 0,
  attendanceRate: null,
};

export function AdminClient() {
  const [workspace, setWorkspace] = useState<AdminWorkspace>(emptyWorkspace);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [proposed, setProposed] = useState<Circle[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [unassignedCount, setUnassignedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function refreshWorkspace() {
    const next = await loadAdminWorkspace();
    setWorkspace(next);
    setSelectedOrg((current) => current || next.organizations[0]?.id || "");
  }

  useEffect(() => {
    refreshWorkspace()
      .catch(() => setError("Mavaro could not load this operator workspace."))
      .finally(() => setLoaded(true));
  }, []);

  const activeOrg = workspace.organizations.find((org) => org.id === selectedOrg) ?? workspace.organizations[0];
  const orgUsers = useMemo(
    () => workspace.users.filter((user) => user.organizationId === selectedOrg),
    [selectedOrg, workspace.users],
  );
  const orgCircles = useMemo(
    () => workspace.circles.filter((circle) => circle.organizationId === selectedOrg),
    [selectedOrg, workspace.circles],
  );
  const circleIds = new Set(orgCircles.map((circle) => circle.id));
  const assignedUserIds = new Set(
    workspace.mode === "supabase"
      ? orgCircles
          .filter((circle) => circle.status === "draft" || circle.status === "active")
          .flatMap((circle) => circle.members.map((member) => member.id))
      : [],
  );
  const eligibleUsers = orgUsers.filter((user) => !assignedUserIds.has(user.id));
  const orgEvents = workspace.events.filter((event) => circleIds.has(event.circleId));
  const repeatInterest = workspace.feedback.length
    ? Math.round(
        (workspace.feedback.filter((item) => item.peopleTheyWouldMeetAgain.length > 0).length /
          workspace.feedback.length) *
          100,
      )
    : null;
  const avgRating = workspace.feedback.length
    ? (workspace.feedback.reduce((sum, item) => sum + item.rating, 0) / workspace.feedback.length).toFixed(1)
    : null;
  const wouldAttendAgainRate = workspace.feedback.length
    ? workspace.feedback.filter((item) => item.wouldAttendAgain).length / workspace.feedback.length
    : 0;
  const workplaceConnectionRate = workspace.feedback.length
    ? workspace.feedback.filter((item) => item.helpedWorkplaceConnection).length / workspace.feedback.length
    : 0;
  const meetAgainRate = workspace.feedback.length
    ? workspace.feedback.filter((item) => item.peopleTheyWouldMeetAgain.length > 0).length / workspace.feedback.length
    : 0;
  const connectionScore = workspace.feedback.length
    ? calculateConnectionScore({
        averageRating: Number(avgRating ?? 0),
        attendanceRate: (workspace.attendanceRate ?? 0) / 100,
        wouldAttendAgainRate,
        workplaceConnectionImprovementRate: workplaceConnectionRate,
        meetAgainRate,
      })
    : null;

  function generateCircles() {
    const result = generateCircleProposals(eligibleUsers, selectedOrg, 8);
    setProposed(result.circles);
    setUnassignedCount(result.unassigned.length);
    setHasGenerated(true);
    setNotice("");
    setError("");
  }

  function changeOrganization(organizationId: string) {
    setSelectedOrg(organizationId);
    setProposed([]);
    setUnassignedCount(0);
    setHasGenerated(false);
    setNotice("");
    setError("");
  }

  async function approveProposals() {
    if (!proposed.length) return;
    setPendingSave(true);
    setError("");
    setNotice("");

    const result = await saveCircleProposals(proposed);
    setPendingSave(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setNotice(result.mode === "demo" ? "Circles approved and saved in demo mode." : "Circles approved and saved.");
    setProposed([]);
    setHasGenerated(false);
    await refreshWorkspace();
  }

  if (!loaded) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="rounded-[2.5rem] bg-espresso p-10 text-parchment shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand/70">Company admin</p>
          <h1 className="mt-5 font-display text-5xl">Opening the employee connection dashboard.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <section className="py-8">
        <div className="rounded-[2.5rem] bg-espresso p-8 text-parchment shadow-soft md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sand/70">Company admin</p>
              <h1 className="mt-5 font-display text-5xl tracking-tight md:text-6xl">Mavaro Admin</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-parchment/72">
                Manage employee connection programs, review proposed circles, and track participation, feedback, and belonging signals.
              </p>
            </div>
            <Button href="/employee/onboarding" variant="secondary" className="bg-parchment text-espresso">
              Add employee profile
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-6 flex flex-wrap gap-3">
        <Button href="/admin/company" variant="secondary">Company</Button>
        <Button href="/admin/employees" variant="secondary">Employees</Button>
        <Button href="/admin/circles" variant="secondary">Circles</Button>
        <Button href="/admin/circles/generate" variant="secondary">Generate Circles</Button>
        <Button href="/admin/events" variant="secondary">Events</Button>
        <Button href="/admin/feedback" variant="secondary">Feedback</Button>
        <Button href="/admin/settings" variant="secondary">Settings</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Total employees" value={`${orgUsers.length}`} helper={workspace.mode === "demo" ? "Demo + local onboarding" : "Completed profiles"} />
        <KpiCard label="Active employee circles" value={`${orgCircles.filter((circle) => circle.status === "active").length}`} helper={`${orgCircles.length} total`} />
        <KpiCard label="RSVP rate" value={workspace.attendanceRate === null ? "—" : `${workspace.attendanceRate}%`} helper="Recorded RSVPs" />
        <KpiCard label="Avg. session rating" value={avgRating ? `${avgRating}/5` : "—"} helper="Employee feedback" />
        <KpiCard label="Would attend again" value={repeatInterest === null ? "—" : `${repeatInterest}%`} helper="Repeat intent" />
        <KpiCard label="Connection score" value={connectionScore === null ? "—" : `${connectionScore}`} helper="MVP signal" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Company</p>
          <h2 className="mt-4 font-display text-4xl text-espresso">Pilot workspace</h2>
          {activeOrg ? (
            <>
              <div className="mt-5">
                <label className="label" htmlFor="admin-organization">Company</label>
                <select id="admin-organization" className="input" value={selectedOrg} onChange={(e) => changeOrganization(e.target.value)}>
                  {workspace.organizations.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name} — {organization.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 rounded-2xl bg-oat/70 p-4 text-sm leading-7 text-espresso/70">
                <p><strong>Industry:</strong> {activeOrg.industry ?? "Employer"}</p>
                <p><strong>Office/city:</strong> {activeOrg.city}</p>
                <p><strong>Workplace model:</strong> {activeOrg.workplaceModel ?? "Hybrid"}</p>
                {workspace.mode === "demo" ? <p><strong>Employer pilot requests:</strong> {workspace.leadCount}</p> : null}
                <p><strong>Average event rating:</strong> {avgRating ? `${avgRating}/5` : "No feedback yet"}</p>
              </div>
              <Button type="button" onClick={generateCircles} className="mt-5 w-full" disabled={eligibleUsers.length < 5}>
                Generate circles
              </Button>
              {eligibleUsers.length < 5 ? (
                <p className="mt-3 text-sm leading-6 text-espresso/55">
                  Invite {5 - eligibleUsers.length} more eligible {5 - eligibleUsers.length === 1 ? "employee" : "employees"} to form a circle.
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-5 leading-7 text-espresso/60">No company workspace is assigned to this admin account yet.</p>
          )}
        </div>

        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">Matching engine</p>
          <h2 className="mt-4 font-display text-4xl text-espresso">Proposed circles</h2>
          <p className="mt-3 text-espresso/64">
            Review each employee cohort before it becomes visible.
          </p>

          <div className="mt-6 space-y-4">
            {proposed.map((circle) => (
              <div key={circle.id} className="rounded-[1.5rem] border border-espresso/10 bg-white/75 p-5">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h3 className="font-display text-3xl text-espresso">{circle.name}</h3>
                    <p className="mt-2 text-sm text-espresso/60">{circle.theme}</p>
                  </div>
                  <span className="rounded-full bg-espresso px-3 py-1 text-xs font-semibold text-parchment">
                    Score {circle.score}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {circle.members.map((member) => <span key={member.id} className="pill">{member.name}</span>)}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-espresso/65">
                  {circle.explanation?.map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
            {proposed.length ? (
              <Button type="button" onClick={approveProposals} className="w-full" disabled={pendingSave}>
                {pendingSave ? "Saving approved circles..." : "Approve and save circles"}
              </Button>
            ) : null}
            {hasGenerated && unassignedCount > 0 ? (
              <p className="text-sm text-espresso/55">
                {unassignedCount} eligible {unassignedCount === 1 ? "employee remains" : "employees remain"} unassigned.
              </p>
            ) : null}
            {!proposed.length ? (
              <div className="rounded-[1.5rem] border border-dashed border-espresso/20 p-8 text-center text-espresso/60">
                {eligibleUsers.length < 5
                  ? "This company needs at least five completed employee profiles before matching begins."
                  : "Generate circles to see proposed cohorts and matching explanations."}
              </div>
            ) : null}
            {notice ? <p className="text-sm text-olive">{notice}</p> : null}
            {error ? <p className="text-sm text-wine" role="alert">{error}</p> : null}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Employees</p>
          <div className="mt-5 space-y-3">
            {orgUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-2xl bg-white/65 p-4">
                <div>
                  <p className="font-semibold text-espresso">{user.name}</p>
                  <p className="text-sm text-espresso/55">{user.department ?? "Team pending"} · {formatTag(user.workMode ?? "hybrid")}</p>
                </div>
                <span className="pill">{formatTag(user.roleLevel ?? "employee")}</span>
              </div>
            ))}
            {!orgUsers.length ? <p className="text-sm text-espresso/55">No completed employee profiles yet.</p> : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-espresso/10 bg-white/70 p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">Events</p>
          <div className="mt-5 space-y-3">
            {orgEvents.map((event) => (
              <div key={event.id} className="rounded-2xl bg-white/65 p-4">
                <p className="font-semibold text-espresso">{event.title}</p>
                <p className="mt-1 text-sm text-espresso/55">{event.location}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-bronze">
                  {new Date(event.startTime).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            ))}
            {!orgEvents.length ? <p className="text-sm text-espresso/55">No employee sessions are scheduled for this company yet.</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function formatTag(tag: string) {
  return tag.replaceAll("_", " ");
}
