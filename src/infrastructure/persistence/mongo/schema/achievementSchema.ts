import { model, Schema, Types } from "mongoose";
import { Achievement } from "../../../../application/entities/achievement";

export type AchievementDocument = Achievement & Document;

const AchievementSchema = new Schema<AchievementDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    season: { type: Types.ObjectId, ref: "Season" },
    player: { type: Types.ObjectId, ref: "Player" },
    team: { type: Types.ObjectId, ref: "Team" },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const AchievementModel = model<AchievementDocument>(
  "Achievement",
  AchievementSchema
);
