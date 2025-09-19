import { Types } from "mongoose";
import { EntityEnum } from "../../../shared/common/enums/entityEnum";
import { Achievement } from "../domain";

export const AchievementSeed = (
  seasonId: Types.ObjectId,
  playerId?: Types.ObjectId,
  teamId?: Types.ObjectId
) => {
  const achievement: Achievement = {
    name: "Miglior centrale",
    description: "Awarded to the best middle blocker of the season",
    date: new Date("2023-05-15"),
    entity: EntityEnum.PLAYER,
    season: seasonId,
    player: playerId,
    team: teamId,
    locked: false,
  };
  return achievement;
};
