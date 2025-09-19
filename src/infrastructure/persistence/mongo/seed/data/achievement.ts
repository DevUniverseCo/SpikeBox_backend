import { Types } from "mongoose";
import { EntityEnum } from "../../../../../application/common/enums/entityEnum";
import { Achievement } from "../../../../../application/domain/achievement";

export const AchievementSeed = (
  seasonId: Types.ObjectId,
  playerId?: Types.ObjectId,
  teamId?: Types.ObjectId
) => {
  const achievement: Achievement = {
    name: "MVP of the Season",
    description: "Awarded to the most valuable player of the season",
    date: new Date("2023-05-15"),
    entity: EntityEnum.PLAYER,
    season: seasonId,
    player: playerId,
    team: teamId,
    locked: false,
  };
  return achievement;
};
