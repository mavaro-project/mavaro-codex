import { matchUsers } from "./matchUsers";
import type { MatchResult, UserProfile } from "../types";

export function generateCircleProposals(
  users: UserProfile[],
  organizationId: string,
  targetCircleSize = 8,
): MatchResult {
  return matchUsers(users, {
    organizationId,
    targetCircleSize,
  });
}
