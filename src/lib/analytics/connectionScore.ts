export interface ConnectionScoreInput {
  averageRating: number;
  attendanceRate: number;
  wouldAttendAgainRate: number;
  workplaceConnectionImprovementRate: number;
  meetAgainRate: number;
}

export function calculateConnectionScore(input: ConnectionScoreInput) {
  const score =
    input.averageRating * 20 * 0.25 +
    input.attendanceRate * 100 * 0.25 +
    input.wouldAttendAgainRate * 100 * 0.2 +
    input.workplaceConnectionImprovementRate * 100 * 0.15 +
    input.meetAgainRate * 100 * 0.15;

  return Math.max(0, Math.min(100, Math.round(score)));
}
