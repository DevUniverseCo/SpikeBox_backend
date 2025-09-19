import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";
import { PositionEnum } from "../../shared/common/enums/positionEum";

export type CreateHistory = {
  player: Types.ObjectId;
  team: Types.ObjectId;
  season: Types.ObjectId;
  position: PositionEnum;
  jerseyNumber?: number;
  isCaptain?: boolean;
};

export type History = Base & CreateHistory;
export type UpdateHistory = Partial<CreateHistory>;
