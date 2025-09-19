import { Types } from "mongoose";
import { EntityEnum } from "../common/enums/entityEnum";
import { Base } from "./base";

export type CreateAchievement = {
  name: string;
  description?: string;
  date: Date;
  entity: EntityEnum;
  season: Types.ObjectId;
  player?: Types.ObjectId;
  team?: Types.ObjectId;
};

export type Achievement = Base & CreateAchievement;
export type UpdateAchievement = Partial<CreateAchievement>;
