import { describe, expect, it } from "vitest";
import { demoUsers } from "../src/lib/mockData";
import { matchUsers } from "../src/lib/matching/matchUsers";

describe("matchUsers", () => {
  it("creates a proposed circle within size constraints", () => {
    const result = matchUsers(demoUsers, {
      organizationId: "company-nova",
      targetCircleSize: 8,
    });

    expect(result.circles.length).toBe(1);
    expect(result.circles[0].members.length).toBeGreaterThanOrEqual(5);
    expect(result.circles[0].members.length).toBeLessThanOrEqual(10);
    expect(result.circles[0].score).toBeGreaterThan(0);
    expect(result.circles[0].explanation?.length).toBeGreaterThan(0);
  });

  it("does not assign a user to multiple circles", () => {
    const result = matchUsers(demoUsers, { targetCircleSize: 5, minCircleSize: 3 });
    const assignedIds = result.circles.flatMap((circle) => circle.members.map((member) => member.id));
    const uniqueIds = new Set(assignedIds);

    expect(uniqueIds.size).toBe(assignedIds.length);
  });

  it("keeps organization-filtered results scoped to that organization", () => {
    const result = matchUsers(demoUsers, {
      organizationId: "company-nova",
      targetCircleSize: 8,
    });

    expect(result.unassigned.every((member) => member.organizationId === "company-nova")).toBe(true);
    expect(result.circles.flatMap((circle) => circle.members)).toSatisfy((members: typeof demoUsers) =>
      members.every((member) => member.organizationId === "company-nova"),
    );
  });

  it("explains employee-specific matching factors", () => {
    const result = matchUsers(demoUsers, {
      organizationId: "company-nova",
      targetCircleSize: 8,
    });

    expect(result.circles[0].explanation?.join(" ")).toContain("Cross-functional mix");
    expect(result.circles[0].programType).toBeDefined();
  });

  it("clamps invalid target sizes to the minimum circle size", () => {
    const result = matchUsers(demoUsers, {
      targetCircleSize: 1,
      minCircleSize: 3,
      maxCircleSize: 5,
    });

    expect(result.circles.length).toBeGreaterThan(0);
    expect(result.circles.every((circle) => circle.members.length >= 3)).toBe(true);
  });
});
