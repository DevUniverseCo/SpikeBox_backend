import { model, Schema, Types } from "mongoose";
import { Season } from "../../../../application/entities/season";

export type SeasonDocument = Season & Document;

const SeasonSchema = new Schema<SeasonDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    season: { type: String, required: true },
    teams: [{ type: Types.ObjectId, ref: "Team" }],
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const SeasonModel = model<SeasonDocument>("Season", SeasonSchema);
