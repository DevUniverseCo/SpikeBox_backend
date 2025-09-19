import { model, Schema } from "mongoose";
import { Season } from "../../../../application/domain/season";

export type SeasonDocument = Season & Document;

const SeasonSchema = new Schema<SeasonDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    season: { type: String, required: true },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

SeasonSchema.virtual("teams", {
  ref: "Team",
  localField: "_id",
  foreignField: "season",
  justOne: false,
});

export const SeasonModel = model<SeasonDocument>("Season", SeasonSchema);
