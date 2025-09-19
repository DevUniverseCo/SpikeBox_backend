import { Types } from "mongoose";
import { PositionEnum } from "../../../../../application/common/enums/positionEum";
import { History } from "../../../../../application/domain/history";

export const HistorySeed = (
  teamId: Types.ObjectId,
  playerId: Types.ObjectId,
  seasonId: Types.ObjectId
) => {
  const history: History = {
    player: playerId,
    team: teamId,
    season: seasonId,
    position: PositionEnum.SETTER,
    jerseyNumber: 5,
    isCaptain: false,
    locked: false,
  };
  return history;
};
