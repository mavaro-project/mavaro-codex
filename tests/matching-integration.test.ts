import { describe, expect, it } from "vitest";
import { generateCircleProposals } from "../src/lib/matching/generateProposals";
import { demoUsers } from "../src/lib/mockData";

describe("admin matching integration", () => {
  it("only proposes members from the selected organization", () => {
    const result = generateCircleProposals(demoUsers, "company-nova");
    const members = result.circles.flatMap((circle) => circle.members);

    expect(result.circles).toHaveLength(1);
    expect(members.every((member) => member.organizationId === "company-nova")).toBe(true);
  });

  it("leaves an undersized organization unassigned", () => {
    const result = generateCircleProposals(demoUsers.slice(0, 4), "company-nova");

    expect(result.circles).toHaveLength(0);
    expect(result.unassigned).toHaveLength(4);
  });
});
