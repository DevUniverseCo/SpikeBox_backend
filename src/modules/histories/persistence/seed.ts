import { Types } from "mongoose";
import { PositionEnum } from "../../../shared/common/enums/positionEum";
import { History } from "../domain";

// Dati dal JSON originale
const playerAssignments = [
  { position: "setter", isCaptain: false, jerseyNumber: 0 },
  { position: "setter", isCaptain: true, jerseyNumber: 0 },
  { position: "opposite", isCaptain: false, jerseyNumber: 0 },
  { position: "opposite", isCaptain: false, jerseyNumber: 0 },
  { position: "outside hitter", isCaptain: false, jerseyNumber: 0 },
  { position: "outside hitter", isCaptain: false, jerseyNumber: 0 },
  { position: "outside hitter", isCaptain: false, jerseyNumber: 0 },
  { position: "outside hitter", isCaptain: false, jerseyNumber: 0 },
  { position: "middle-blocker", isCaptain: false, jerseyNumber: 0 },
  { position: "middle-blocker", isCaptain: false, jerseyNumber: 0 },
  { position: "middle-blocker", isCaptain: false, jerseyNumber: 0 },
  { position: "libero", isCaptain: false, jerseyNumber: 0 },
  { position: "libero", isCaptain: false, jerseyNumber: 0 },
];

export const HistorySeed = (
  teamId: Types.ObjectId,
  playerIds: Types.ObjectId[],
  seasonId: Types.ObjectId
): History[] => {
  return playerIds.map((playerId, idx) => {
    const assignment = playerAssignments[idx];

    let position: PositionEnum;

    switch (assignment.position.toLowerCase()) {
      case "setter":
        position = PositionEnum.SETTER;
        break;
      case "opposite":
        position = PositionEnum.OPPOSITE;
        break;
      case "outside hitter":
        position = PositionEnum.OUTSIDE_HITTER;
        break;
      case "middle-blocker":
        position = PositionEnum.MIDDLE_BLOCKER;
        break;
      case "libero":
        position = PositionEnum.LIBERO;
        break;
      default:
        position = PositionEnum.OTHER;
    }

    const history: History = {
      player: playerId,
      team: teamId,
      season: seasonId,
      position,
      jerseyNumber: assignment.jerseyNumber,
      isCaptain: assignment.isCaptain,
      locked: false,
    };

    return history;
  });
};
