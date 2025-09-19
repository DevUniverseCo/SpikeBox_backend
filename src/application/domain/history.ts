import { Types } from "mongoose";
import { PositionEnum } from "../common/enums/positionEum";
import { Base } from "./base";

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
