import { model, Schema, Types } from "mongoose";
import { Achievement } from "../../domain";

export type AchievementDocument = Document &
  Omit<
    Achievement,
    | "id"
    | "seasonId"
    | "playerId"
    | "teamId"
    | "staffId"
    | "createdAt"
    | "updatedAt"
  > & {
    seasonId: Types.ObjectId;
    playerId?: Types.ObjectId;
    teamId?: Types.ObjectId;
    staffId?: Types.ObjectId;
  };

const AchievementSchema = new Schema<AchievementDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    achievedAt: { type: Date, required: true },
    seasonId: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    playerId: { type: Schema.Types.ObjectId, ref: "Player" },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff" },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

AchievementSchema.virtual("id").get(function () {
  return this._id.toString();
});

export const AchievementModel = model<AchievementDocument>(
  "Achievement",
  AchievementSchema
);
