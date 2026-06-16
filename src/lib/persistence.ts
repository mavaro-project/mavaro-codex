import { demoCircle, demoEvents, demoUsers, organizations as demoOrganizations } from "./mockData";
import {
  getFeedback,
  getLocalCircles,
  getPilotLeads,
  getProfile,
  getRsvps,
  saveFeedback,
  saveLocalCircles,
  saveProfile,
  saveRsvp,
} from "./storage";
import { createSupabaseBrowserClient } from "./supabase/client";
import { isSupabaseConfigured } from "./supabase/config";
import type {
  Circle,
  Event,
  Feedback,
  Organization,
  RSVPStatus,
  UserProfile,
} from "./types";

export interface MemberExperience {
  mode: "supabase" | "demo";
  profile: UserProfile | null;
  circle: Circle | null;
  events: Event[];
  rsvps: Record<string, RSVPStatus>;
}

export interface AdminWorkspace {
  mode: "supabase" | "demo";
  organizations: Organization[];
  users: UserProfile[];
  circles: Circle[];
  events: Event[];
  feedback: Feedback[];
  leadCount: number;
  attendanceRate: number | null;
}

export async function saveMemberProfile(profile: UserProfile) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return saveProfile(profile)
      ? { ok: true as const, mode: "demo" as const }
      : { ok: false as const, error: "This browser blocked local demo storage." };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false as const, error: "Your session expired. Please sign in again." };
  }

  let organizationId: string | null = null;
  if (profile.organizationType && profile.organizationType !== "independent") {
    const { data, error } = await supabase.rpc("resolve_onboarding_organization", {
      requested_type: "employer",
    });
    if (error) return { ok: false as const, error: error.message };
    organizationId = data;
  }

  const { error } = await supabase.from("profiles").upsert({
    id: userData.user.id,
    email: userData.user.email ?? profile.email ?? null,
    name: profile.name,
    age_range: profile.ageRange,
    city: profile.city,
    neighborhood: profile.neighborhood,
    organization_id: organizationId,
    organization_type: "employer",
    department: profile.department ?? null,
    work_mode: profile.workMode ?? null,
    role_level: profile.roleLevel ?? null,
    tenure: profile.tenure ?? null,
    start_date: profile.startDate ?? null,
    preferred_formats: profile.preferredFormats ?? [],
    manager_status: profile.managerStatus ?? false,
    erg_interests: profile.ergInterests ?? [],
    dietary_restrictions: profile.dietaryRestrictions ?? null,
    accessibility_needs: profile.accessibilityNeeds ?? null,
    notes: profile.notes ?? null,
    onboarding_completed: true,
    interests: profile.interests,
    social_goals: profile.socialGoals,
    availability: profile.availability,
    vibes: profile.vibes,
    preferred_group_size: profile.preferredGroupSize ?? 8,
  });

  return error
    ? { ok: false as const, error: error.message }
    : { ok: true as const, mode: "supabase" as const };
}

export async function loadMemberExperience(): Promise<MemberExperience> {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return loadDemoMemberExperience();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return { mode: "supabase", profile: null, circle: null, events: [], rsvps: {} };

  const { data: profileRow } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  const profile = profileRow ? mapProfile(profileRow) : null;
  const { data: membership } = await supabase
    .from("circle_members")
    .select("circle_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return { mode: "supabase", profile, circle: null, events: [], rsvps: {} };
  }

  const [{ data: circleRow }, { data: memberRows }, { data: eventRows }, { data: rsvpRows }] = await Promise.all([
    supabase.from("circles").select("*").eq("id", membership.circle_id).maybeSingle(),
    supabase.rpc("get_my_circle_members", { target_circle_id: membership.circle_id }),
    supabase.from("events").select("*").eq("circle_id", membership.circle_id).order("start_time"),
    supabase.from("rsvps").select("event_id, status").eq("user_id", user.id),
  ]);

  const members: UserProfile[] = (memberRows ?? []).map((member) => ({
    id: member.id,
    name: member.name,
    ageRange: "",
    city: "",
    neighborhood: member.neighborhood ?? "",
    interests: [],
    socialGoals: [],
    availability: [],
    vibes: [],
  }));

  return {
    mode: "supabase",
    profile,
    circle: circleRow ? mapCircle(circleRow, members) : null,
    events: (eventRows ?? []).map(mapEvent),
    rsvps: Object.fromEntries((rsvpRows ?? []).map((rsvp) => [rsvp.event_id, rsvp.status])),
  };
}

export async function persistRsvp(eventId: string, status: RSVPStatus) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return saveRsvp(eventId, status) ? null : "This browser blocked local demo storage.";

  const { data } = await supabase.auth.getUser();
  if (!data.user) return "Your session expired. Please sign in again.";

  const { error } = await supabase.from("rsvps").upsert(
    { event_id: eventId, user_id: data.user.id, status },
    { onConflict: "event_id,user_id" },
  );
  return error?.message ?? null;
}

export async function persistFeedback(feedback: Feedback) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return saveFeedback(feedback) ? null : "This browser blocked local demo storage.";

  const { data } = await supabase.auth.getUser();
  if (!data.user) return "Your session expired. Please sign in again.";

  const { error } = await supabase.from("feedback").upsert(
    {
      event_id: feedback.eventId,
      user_id: data.user.id,
      rating: feedback.rating,
      would_attend_again: feedback.wouldAttendAgain,
      helped_workplace_connection: feedback.helpedWorkplaceConnection ?? feedback.rating >= 4,
      people_they_would_meet_again: feedback.peopleTheyWouldMeetAgain,
      comment: feedback.comment ?? null,
    },
    { onConflict: "event_id,user_id" },
  );
  return error?.message ?? null;
}

export async function loadAdminWorkspace(): Promise<AdminWorkspace> {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return loadDemoAdminWorkspace();

  const { data: membership } = await supabase
    .from("admin_memberships")
    .select("organization_id")
    .limit(1)
    .maybeSingle();
  if (!membership) {
    return {
      mode: "supabase",
      organizations: [],
      users: [],
      circles: [],
      events: [],
      feedback: [],
      leadCount: 0,
      attendanceRate: null,
    };
  }

  const organizationId = membership.organization_id;
  const [{ data: orgRows }, { data: profileRows }, { data: circleRows }] = await Promise.all([
    supabase.from("organizations").select("*").eq("id", organizationId),
    supabase.from("profiles").select("*").eq("organization_id", organizationId).order("created_at"),
    supabase.from("circles").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
  ]);

  const circleIds = (circleRows ?? []).map((circle) => circle.id);
  const [{ data: eventRows }, { data: feedbackRows }, { data: circleMemberRows }, { data: rsvpRows }] = circleIds.length
    ? await Promise.all([
        supabase.from("events").select("*").in("circle_id", circleIds).order("start_time"),
        supabase.from("feedback").select("*"),
        supabase.from("circle_members").select("circle_id, user_id").in("circle_id", circleIds),
        supabase.from("rsvps").select("status"),
      ])
    : [{ data: [] }, { data: [] }, { data: [] }, { data: [] }];

  const users = (profileRows ?? []).map(mapProfile);
  const usersById = new Map(users.map((user) => [user.id, user]));
  const circles = (circleRows ?? []).map((row) =>
    mapCircle(
      row,
      (circleMemberRows ?? [])
        .filter((member) => member.circle_id === row.id)
        .map((member) => usersById.get(member.user_id))
        .filter((member): member is UserProfile => Boolean(member)),
    ),
  );

  return {
    mode: "supabase",
    organizations: (orgRows ?? []).map(mapOrganization),
    users,
    circles,
    events: (eventRows ?? []).map(mapEvent),
    feedback: (feedbackRows ?? []).map(mapFeedback),
    leadCount: 0,
    attendanceRate: rsvpRows?.length
      ? Math.round((rsvpRows.filter((rsvp) => rsvp.status === "going").length / rsvpRows.length) * 100)
      : null,
  };
}

export async function saveCircleProposals(circles: Circle[]) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    return saveLocalCircles(circles)
      ? { ok: true as const, mode: "demo" as const }
      : { ok: false as const, error: "This browser blocked local demo storage." };
  }

  for (const circle of circles) {
    const { error } = await supabase.rpc("save_circle_proposal", {
      proposal: {
        organization_id: circle.organizationId,
        name: circle.name,
        theme: circle.theme,
        start_date: circle.startDate,
        duration_weeks: circle.durationWeeks,
        score: circle.score ?? null,
        explanation: circle.explanation ?? [],
        member_ids: circle.members.map((member) => member.id),
      },
    });
    if (error) return { ok: false as const, error: error.message };
  }

  return { ok: true as const, mode: "supabase" as const };
}

function loadDemoMemberExperience(): MemberExperience {
  const profile = getProfile();
  const circle =
    profile?.organizationId === demoCircle.organizationId
      ? {
          ...demoCircle,
          members: [profile, ...demoCircle.members.filter((member) => member.id !== profile.id)].slice(0, 8),
        }
      : demoCircle;

  return {
    mode: "demo",
    profile,
    circle,
    events: demoEvents,
    rsvps: getRsvps(),
  };
}

function loadDemoAdminWorkspace(): AdminWorkspace {
  const profile = getProfile();
  const savedCircles = getLocalCircles();

  return {
    mode: "demo",
    organizations: demoOrganizations,
    users: profile ? [profile, ...demoUsers] : demoUsers,
    circles: savedCircles.length ? savedCircles : [demoCircle],
    events: demoEvents,
    feedback: getFeedback(),
    leadCount: getPilotLeads().length,
    attendanceRate: 74,
  };
}

function mapProfile(row: {
  id: string;
  name: string;
  email: string | null;
  age_range: string | null;
  city: string | null;
  neighborhood: string | null;
  organization_id: string | null;
  organization_type: UserProfile["organizationType"] | null;
  department?: string | null;
  work_mode?: string | null;
  role_level?: string | null;
  tenure?: string | null;
  start_date?: string | null;
  preferred_formats?: string[] | null;
  manager_status?: boolean | null;
  erg_interests?: string[] | null;
  dietary_restrictions?: string | null;
  accessibility_needs?: string | null;
  notes?: string | null;
  onboarding_completed?: boolean | null;
  interests: string[];
  social_goals: string[];
  availability: string[];
  vibes: string[];
  preferred_group_size: number | null;
  created_at: string;
}): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    ageRange: row.age_range ?? "",
    city: row.city ?? "",
    neighborhood: row.neighborhood ?? "",
    organizationId: row.organization_id ?? undefined,
    organizationType: row.organization_type ?? undefined,
    company: "NovaWorks",
    department: row.department ?? undefined,
    workMode: row.work_mode as UserProfile["workMode"] | undefined,
    roleLevel: row.role_level as UserProfile["roleLevel"] | undefined,
    tenure: row.tenure as UserProfile["tenure"] | undefined,
    startDate: row.start_date ?? undefined,
    preferredFormats: (row.preferred_formats ?? []) as UserProfile["preferredFormats"],
    managerStatus: row.manager_status ?? undefined,
    ergInterests: row.erg_interests ?? undefined,
    dietaryRestrictions: row.dietary_restrictions ?? undefined,
    accessibilityNeeds: row.accessibility_needs ?? undefined,
    notes: row.notes ?? undefined,
    onboardingCompleted: row.onboarding_completed ?? undefined,
    interests: row.interests,
    socialGoals: row.social_goals as UserProfile["socialGoals"],
    availability: row.availability as UserProfile["availability"],
    vibes: row.vibes as UserProfile["vibes"],
    preferredGroupSize: row.preferred_group_size ?? undefined,
    joinedAt: row.created_at,
  };
}

function mapOrganization(row: {
  id: string;
  name: string;
  type: Organization["type"];
  city: string;
  neighborhood: string;
  industry?: string | null;
  company_size?: string | null;
  workplace_model?: string | null;
  office_locations?: string[] | null;
  status?: string | null;
}): Organization {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    city: row.city,
    neighborhood: row.neighborhood,
    industry: row.industry ?? undefined,
    companySize: row.company_size ?? undefined,
    workplaceModel: row.workplace_model ?? undefined,
    officeLocations: row.office_locations ?? undefined,
    status: row.status ?? undefined,
  };
}

function mapCircle(
  row: {
    id: string;
    organization_id: string;
    name: string;
    theme: string | null;
    status: Circle["status"];
    start_date: string | null;
    duration_weeks: number;
    score: number | null;
    explanation: string[];
  },
  members: UserProfile[],
): Circle {
  return {
    id: row.id,
    organizationId: row.organization_id,
    name: row.name,
    theme: row.theme ?? "",
    status: row.status,
    startDate: row.start_date ?? "",
    durationWeeks: row.duration_weeks,
    members,
    score: row.score ?? undefined,
    explanation: row.explanation,
    programType: row.theme?.includes("Manager")
      ? "Manager Peer Circle"
      : row.theme?.includes("New Hire")
        ? "New Hire Circle"
        : "Hybrid Office-Day Circle",
    officeCity: "New York",
    targetSize: members.length || 8,
  };
}

function mapEvent(row: {
  id: string;
  circle_id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_type: string;
  office_city?: string | null;
  status?: string | null;
  start_time: string;
  end_time: string;
}): Event {
  return {
    id: row.id,
    circleId: row.circle_id,
    title: row.title,
    description: row.description ?? "",
    location: row.location ?? "",
    eventType: row.event_type,
    officeCity: row.office_city ?? undefined,
    status: row.status ?? undefined,
    startTime: row.start_time,
    endTime: row.end_time,
  };
}

function mapFeedback(row: {
  id: string;
  event_id: string;
  user_id: string;
  rating: number | null;
  would_attend_again: boolean;
  helped_workplace_connection?: boolean | null;
  people_they_would_meet_again: string[];
  comment: string | null;
}): Feedback {
  return {
    id: row.id,
    eventId: row.event_id,
    userId: row.user_id,
    rating: row.rating ?? 0,
    wouldAttendAgain: row.would_attend_again,
    helpedWorkplaceConnection: row.helped_workplace_connection ?? undefined,
    peopleTheyWouldMeetAgain: row.people_they_would_meet_again,
    comment: row.comment ?? undefined,
  };
}

export function persistenceUsesSupabase() {
  return isSupabaseConfigured();
}
