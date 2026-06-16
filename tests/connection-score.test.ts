import { describe, expect, it } from "vitest";
import { calculateConnectionScore } from "../src/lib/analytics/connectionScore";

describe("calculateConnectionScore", () => {
  it("combines rating, attendance, repeat intent, workplace connection, and meet-again signals", () => {
    expect(
      calculateConnectionScore({
        averageRating: 4.5,
        attendanceRate: 0.8,
        wouldAttendAgainRate: 0.75,
        workplaceConnectionImprovementRate: 0.7,
        meetAgainRate: 0.6,
      }),
    ).toBe(77);
  });

  it("clamps the score to the 0-100 range", () => {
    expect(
      calculateConnectionScore({
        averageRating: 9,
        attendanceRate: 2,
        wouldAttendAgainRate: 2,
        workplaceConnectionImprovementRate: 2,
        meetAgainRate: 2,
      }),
    ).toBe(100);
  });
});
