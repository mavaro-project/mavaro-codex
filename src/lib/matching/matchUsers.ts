import type { Circle, MatchOptions, MatchResult, UserProfile } from "../types";

const DEFAULT_TARGET_SIZE = 8;
const DEFAULT_MIN_SIZE = 5;
const DEFAULT_MAX_SIZE = 10;

function intersectionCount(a: string[], b: string[]) {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item)).length;
}

function uniqueValues<T>(items: T[]) {
  return Array.from(new Set(items));
}

function pairScore(a: UserProfile, b: UserProfile) {
  const sharedAvailability = intersectionCount(a.availability, b.availability);
  const sharedGoals = intersectionCount(a.socialGoals, b.socialGoals);
  const sameOfficeOrCity = a.city === b.city || a.neighborhood === b.neighborhood ? 1 : 0;
  const sameCompany = Boolean(a.organizationId && a.organizationId === b.organizationId) ? 1 : 0;
  const compatibleWorkMode = a.workMode && b.workMode && a.workMode === b.workMode ? 1 : 0;
  const roleLevelCompatibility = a.roleLevel && b.roleLevel && a.roleLevel === b.roleLevel ? 1 : 0;
  const tenureFit = a.tenure && b.tenure && a.tenure === b.tenure ? 1 : 0;
  const programTypeFit = sharedGoals > 0 ? 1 : 0;

  return (
    sharedAvailability * 4 +
    sharedGoals * 4 +
    sameOfficeOrCity * 5 +
    compatibleWorkMode * 3 +
    programTypeFit * 4 +
    sameCompany * 4 +
    tenureFit * 2 +
    roleLevelCompatibility * 2
  );
}

function groupScore(users: UserProfile[]) {
  if (users.length <= 1) return 0;

  let total = 0;
  let comparisons = 0;

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      total += pairScore(users[i], users[j]);
      comparisons += 1;
    }
  }

  const averagePairScore = total / comparisons;
  const uniqueDepartments = uniqueValues(users.map((user) => user.department).filter(Boolean)).length;
  const diversityBonus = Math.min(uniqueDepartments, 8) * 2;

  return Math.round(Math.min(100, averagePairScore * 4 + diversityBonus));
}

function explainGroup(users: UserProfile[]) {
  const availability = users.flatMap((user) => user.availability);
  const goals = users.flatMap((user) => user.socialGoals);
  const departments = uniqueValues(users.map((user) => user.department).filter(Boolean));
  const workModes = uniqueValues(users.map((user) => user.workMode).filter((mode): mode is NonNullable<typeof mode> => Boolean(mode)));

  const topAvailability = topCounts(availability, 2).map(([name, count]) => `${count} share ${formatTag(name)}`);
  const topGoals = topCounts(goals, 2).map(([name]) => formatTag(name));
  const cities = uniqueValues(users.map((user) => user.city));

  return [
    topAvailability.length ? `Availability overlap: ${topAvailability.join(", ")}.` : "Availability overlap is mixed.",
    topGoals.length ? `Shared employee goals: ${topGoals.join(", ")}.` : "Connection goals are mixed but compatible.",
    departments.length > 1 ? `Cross-functional mix: ${departments.join(", ")}.` : "Department mix is focused.",
    cities.length === 1 ? `Office/city fit: ${cities[0]}.` : `Office/city spread: ${cities.join(", ")}.`,
    workModes.length ? `Work mode fit: ${workModes.map(formatTag).join(", ")}.` : "Work mode data is still developing.",
  ];
}

function topCounts(items: string[], limit: number): Array<[string, number]> {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function formatTag(tag: string) {
  return tag.replaceAll("_", " ");
}

function chooseSeed(users: UserProfile[]) {
  return [...users].sort((a, b) => {
    const aConnections = users.reduce((sum, user) => (user.id === a.id ? sum : sum + pairScore(a, user)), 0);
    const bConnections = users.reduce((sum, user) => (user.id === b.id ? sum : sum + pairScore(b, user)), 0);
    return bConnections - aConnections;
  })[0];
}

export function matchUsers(users: UserProfile[], options: MatchOptions = {}): MatchResult {
  const minCircleSize = Math.max(2, options.minCircleSize ?? DEFAULT_MIN_SIZE);
  const maxCircleSize = Math.max(minCircleSize, options.maxCircleSize ?? DEFAULT_MAX_SIZE);
  const targetCircleSize = Math.min(
    maxCircleSize,
    Math.max(minCircleSize, options.targetCircleSize ?? DEFAULT_TARGET_SIZE),
  );

  const eligible = options.organizationId
    ? users.filter((user) => user.organizationId === options.organizationId)
    : [...users];

  const remaining = [...eligible];
  const circles: Circle[] = [];

  while (remaining.length >= minCircleSize) {
    const seed = chooseSeed(remaining);
    const group = [seed];
    removeById(remaining, seed.id);

    while (group.length < Math.min(targetCircleSize, maxCircleSize) && remaining.length > 0) {
      const next = [...remaining].sort((a, b) => {
        const scoreA = group.reduce((sum, member) => sum + pairScore(a, member), 0);
        const scoreB = group.reduce((sum, member) => sum + pairScore(b, member), 0);
        return scoreB - scoreA;
      })[0];

      group.push(next);
      removeById(remaining, next.id);
    }

    if (group.length >= minCircleSize) {
      const circleNumber = circles.length + 1;
      circles.push({
        id: `proposed-${circleNumber}`,
        organizationId: options.organizationId ?? group[0].organizationId ?? "independent",
        name: options.theme ? `${options.theme} ${circleNumber}` : suggestCircleName(group, circleNumber),
        theme: options.theme ?? suggestTheme(group),
        programType: options.theme?.includes("Manager") ? "Manager Peer Circle" : "Hybrid Office-Day Circle",
        status: "draft",
        startDate: nextSundayIso(),
        durationWeeks: 6,
        targetSize: targetCircleSize,
        officeCity: group[0].city,
        members: group,
        score: groupScore(group),
        explanation: explainGroup(group),
      });
    } else {
      remaining.push(...group);
      break;
    }
  }

  return {
    circles,
    unassigned: remaining,
  };
}

function removeById(users: UserProfile[], id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) users.splice(index, 1);
}

function suggestTheme(users: UserProfile[]) {
  const top = topCounts(users.flatMap((user) => user.socialGoals), 3).map(([goal]) => formatTag(goal));
  if (top.some((goal) => goal.includes("new hire"))) return "New hire onboarding and cross-team belonging";
  if (top.some((goal) => goal.includes("manager"))) return "Manager peer support and reflective leadership";
  if (top.some((goal) => goal.includes("wellness"))) return "Wellness, reset, and steady workplace trust";
  return top.length ? `${top.join(", ")} employee circle` : "Curated employee connection circle";
}

function suggestCircleName(users: UserProfile[], circleNumber: number) {
  const theme = suggestTheme(users).toLowerCase();
  if (theme.includes("new hire")) return "New Hire Circle";
  if (theme.includes("manager")) return "Manager Peer Circle";
  if (theme.includes("wellness")) return "Wellness Circle";
  return `Employee Circle ${circleNumber}`;
}

function nextSundayIso() {
  const date = new Date();
  const day = date.getDay();
  const diff = (7 - day) % 7 || 7;
  date.setDate(date.getDate() + diff);
  date.setHours(18, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}
