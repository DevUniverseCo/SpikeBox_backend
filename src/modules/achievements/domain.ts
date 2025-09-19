import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";
import { EntityEnum } from "../../shared/common/enums/entityEnum";

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
