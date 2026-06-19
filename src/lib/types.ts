export type OrganizationType = "apartment_building" | "coworking" | "employer" | "gym" | "venue";
export type CircleStatus = "draft" | "active" | "paused" | "completed" | "archived";
export type RSVPStatus = "going" | "maybe" | "cant_go";
export type ProfileRole = "admin" | "owner";

export type SocialGoal =
  | "cross_functional_colleagues"
  | "feel_connected"
  | "new_hire_onboarding"
  | "professional_peer_support"
  | "erg_circle"
  | "wellness_balance"
  | "manager_peer_support"
  | "office_city_connection"
  | "professional_community"
  | "make_friends";

export type Availability =
  | "weekday_breakfast"
  | "weekday_lunch"
  | "weekday_afternoon"
  | "weekday_evening"
  | "office_anchor_days"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "weekday_mornings"
  | "weekday_evenings";

export type Vibe =
  | "casual"
  | "professional"
  | "reflective"
  | "active"
  | "food_centered"
  | "career_focused"
  | "wellness_focused"
  | "culture_focused"
  | "chill"
  | "food_drink";

export type WorkMode = "mostly_in_office" | "hybrid" | "mostly_remote" | "remote_near_hub";
export type RoleLevel = "individual_contributor" | "manager" | "senior_manager" | "director_plus" | "executive" | "early_career";
export type Tenure = "new_hire" | "three_to_twelve_months" | "one_to_three_years" | "three_plus_years";
export type PreferredFormat =
  | "coffee_chats"
  | "lunch_circles"
  | "walk_and_talks"
  | "team_dinners"
  | "skill_career_circles"
  | "wellness_circles"
  | "erg_circles"
  | "manager_peer_circles";
export type ProgramType =
  | "New Hire Circle"
  | "Hybrid Office-Day Circle"
  | "Cross-Team Lunch Circle"
  | "Manager Peer Circle"
  | "ERG Circle"
  | "Wellness Circle"
  | "City/Office Hub Circle"
  | "Culture & Belonging Circle";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  city: string;
  neighborhood: string;
  industry?: string;
  companySize?: string;
  workplaceModel?: string;
  officeLocations?: string[];
  status?: string;
  memberCount?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  ageRange: string;
  city: string;
  neighborhood: string;
  organizationId?: string;
  organizationType?: OrganizationType | "independent";
  company?: string;
  department?: string;
  workMode?: WorkMode;
  roleLevel?: RoleLevel;
  tenure?: Tenure;
  startDate?: string;
  preferredFormats?: PreferredFormat[];
  managerStatus?: boolean;
  ergInterests?: string[];
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  notes?: string;
  photo?: string;
  onboardingCompleted?: boolean;
  interests: string[];
  socialGoals: SocialGoal[];
  availability: Availability[];
  vibes: Vibe[];
  preferredGroupSize?: number;
  joinedAt?: string;
}

export interface Circle {
  id: string;
  organizationId: string;
  name: string;
  theme: string;
  status: CircleStatus;
  startDate: string;
  durationWeeks: number;
  programType?: ProgramType;
  officeCity?: string;
  targetSize?: number;
  departmentFilter?: string;
  members: UserProfile[];
  score?: number;
  explanation?: string[];
  warnings?: string[];
}

export interface Event {
  id: string;
  circleId: string;
  organizationId?: string;
  title: string;
  description: string;
  location: string;
  eventType: string;
  officeCity?: string;
  status?: string;
  startTime: string;
  endTime: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  wouldAttendAgain: boolean;
  helpedWorkplaceConnection?: boolean;
  peopleTheyWouldMeetAgain: string[];
  comment?: string;
}

export interface MatchOptions {
  organizationId?: string;
  targetCircleSize?: number;
  minCircleSize?: number;
  maxCircleSize?: number;
  theme?: string;
}

export interface MatchResult {
  circles: Circle[];
  unassigned: UserProfile[];
}
