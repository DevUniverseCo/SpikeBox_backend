import { model, Schema, Types } from "mongoose";
import { EntityEnum } from "../../../shared/common/enums/entityEnum";
import { Achievement } from "../domain";

export type AchievementDocument = Achievement & Document;

const AchievementSchema = new Schema<AchievementDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    player: { type: Types.ObjectId, ref: "Player" },
    team: { type: Types.ObjectId, ref: "Team" },
    entity: { type: String, enum: Object.values(EntityEnum), required: true },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const AchievementModel = model<AchievementDocument>(
  "Achievement",
  AchievementSchema
);
