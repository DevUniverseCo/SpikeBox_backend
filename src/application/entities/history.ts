import { Types } from "mongoose";
import { PositionEnum } from "../common/enums/positionEum";
import { Base } from "./base";

export type CreateHistory = {
  player: Types.ObjectId; // ref Player
  team: Types.ObjectId; // ref Team
  season: Types.ObjectId; // ref Season
  position: PositionEnum;
  jerseyNumber?: number;
  isCaptain?: boolean;
};

export type History = Base & CreateHistory;

export type UpdateHistory = Partial<CreateHistory>;
