import { demoCircle, demoEvents, demoUsers, organizations as demoOrganizations } from "@/lib/mockData";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Circle, Event, Feedback, Organization, UserProfile } from "@/lib/types";

export async function loadAdminOrganizations(): Promise<Organization[]> {
  if (!isSupabaseConfigured()) return demoOrganizations;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase.from("organizations").select("*").order("name");
  return (data ?? []).map((row) => ({
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
  }));
}

export async function loadAdminEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return demoEvents;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase.from("events").select("*").order("start_time");
  return (data ?? []).map((row) => ({
    id: row.id,
    circleId: row.circle_id,
    title: row.title,
    description: row.description ?? "",
    location: row.location ?? "",
    eventType: row.event_type,
    organizationId: row.company_id ?? row.organization_id ?? undefined,
    officeCity: row.office_city ?? undefined,
    status: row.status ?? undefined,
    startTime: row.start_time,
    endTime: row.end_time,
  }));
}

export async function loadAdminEmployees(): Promise<UserProfile[]> {
  if (!isSupabaseConfigured()) return demoUsers;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  return (data ?? []).map(mapProfile);
}

export async function loadAdminFeedback(): Promise<Feedback[]> {
  if (!isSupabaseConfigured()) {
    return [
      {
        id: "feedback-demo-1",
        eventId: "event-1",
        userId: "u-1",
        rating: 5,
        wouldAttendAgain: true,
        helpedWorkplaceConnection: true,
        peopleTheyWouldMeetAgain: ["u-2", "u-5"],
      },
    ];
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    eventId: row.event_id,
    userId: row.user_id,
    rating: row.rating ?? 0,
    wouldAttendAgain: row.would_attend_again,
    helpedWorkplaceConnection: row.helped_workplace_connection ?? undefined,
    peopleTheyWouldMeetAgain: row.people_they_would_meet_again,
    comment: row.comment ?? undefined,
  }));
}

export async function loadAdminCircles(): Promise<Circle[]> {
  if (!isSupabaseConfigured()) return [demoCircle];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const [{ data: circleRows }, { data: memberRows }, { data: profileRows }] = await Promise.all([
    supabase.from("circles").select("*").order("created_at", { ascending: false }),
    supabase.from("circle_members").select("circle_id, user_id"),
    supabase.from("profiles").select("*"),
  ]);

  const profiles = new Map((profileRows ?? []).map((row) => [row.id, mapProfile(row)]));

  return (circleRows ?? []).map((row) => ({
    id: row.id,
    organizationId: row.organization_id,
    name: row.name,
    theme: row.theme ?? "",
    status: row.status,
    startDate: row.start_date ?? "",
    durationWeeks: row.duration_weeks,
    programType: (row.program_type ?? "Hybrid Office-Day Circle") as Circle["programType"],
    officeCity: row.office_city ?? undefined,
    targetSize: row.target_size ?? undefined,
    score: row.score ?? undefined,
    explanation: row.explanation,
    members: (memberRows ?? [])
      .filter((member) => member.circle_id === row.id)
      .map((member) => profiles.get(member.user_id))
      .filter((profile): profile is UserProfile => Boolean(profile)),
  }));
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
