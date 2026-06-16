import type { Feedback, RSVPStatus, UserProfile } from "./types";

const PROFILE_KEY = "mavaro.profile";
const RSVP_KEY = "mavaro.rsvps";
const FEEDBACK_KEY = "mavaro.feedback";
const PILOT_KEY = "mavaro.pilotLeads";
const CIRCLES_KEY = "mavaro.savedCircles";

export interface PilotLead {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: string;
  city: string;
  title: string;
  primaryGoal: string;
  workplaceModel: string;
  message: string;
  createdAt: string;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function saveProfile(profile: UserProfile) {
  return writeJson(PROFILE_KEY, profile);
}

export function getProfile() {
  return readJson<UserProfile | null>(PROFILE_KEY, null);
}

export function saveRsvp(eventId: string, status: RSVPStatus) {
  const rsvps = readJson<Record<string, RSVPStatus>>(RSVP_KEY, {});
  rsvps[eventId] = status;
  return writeJson(RSVP_KEY, rsvps);
}

export function getRsvps() {
  return readJson<Record<string, RSVPStatus>>(RSVP_KEY, {});
}

export function saveFeedback(feedback: Feedback) {
  const existing = readJson<Feedback[]>(FEEDBACK_KEY, []);
  return writeJson(FEEDBACK_KEY, [feedback, ...existing.filter((item) => item.id !== feedback.id)]);
}

export function getFeedback() {
  return readJson<Feedback[]>(FEEDBACK_KEY, []);
}

export function savePilotLead(lead: PilotLead) {
  const existing = readJson<PilotLead[]>(PILOT_KEY, []);
  return writeJson(PILOT_KEY, [lead, ...existing]);
}

export function getPilotLeads() {
  return readJson<PilotLead[]>(PILOT_KEY, []);
}

export function saveLocalCircles(circles: import("./types").Circle[]) {
  const existing = readJson<import("./types").Circle[]>(CIRCLES_KEY, []);
  const next = [...circles, ...existing.filter((saved) => !circles.some((circle) => circle.id === saved.id))];
  return writeJson(CIRCLES_KEY, next);
}

export function getLocalCircles() {
  return readJson<import("./types").Circle[]>(CIRCLES_KEY, []);
}
