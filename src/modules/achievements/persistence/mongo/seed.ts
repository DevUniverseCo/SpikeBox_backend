import { Types } from "mongoose";
import { Achievement } from "../../domain";

export const AchievementSeed = (
  seasonId: Types.ObjectId,
  playerId?: Types.ObjectId,
  teamId?: Types.ObjectId,
  staffId?: Types.ObjectId
): Omit<Achievement, "id" | "createdAt" | "updatedAt"> => {
  return {
    name: "Miglior Centrale",
    description: "Awarded to the best middle blocker of the season",
    achievedAt: new Date("2023-05-15"),
    seasonId: seasonId.toString(),
    playerId: playerId?.toString(),
    teamId: teamId?.toString(),
    staffId: staffId?.toString(),
    locked: false,
  };
};
