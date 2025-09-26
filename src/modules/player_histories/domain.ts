import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";
import { PositionEnum } from "../../shared/common/enums/positionEum";

export type CreatePlayerHistory = {
  player: Types.ObjectId;
  team: Types.ObjectId;
  season: Types.ObjectId;
  position: PositionEnum;
  jerseyNumber?: number;
  isCaptain?: boolean;
};

export type PlayerHistory = Base & CreatePlayerHistory;
export type UpdatePlayerHistory = Partial<CreatePlayerHistory>;
