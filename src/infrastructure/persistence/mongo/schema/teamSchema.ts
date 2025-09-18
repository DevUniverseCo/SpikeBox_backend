import { model, Schema } from "mongoose";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { LeagueEnum } from "../../../../application/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../application/common/enums/levelEnum ";
import { Team } from "../../../../application/entities/team";

export type TeamDocument = Team & Document;

const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    season: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    roster: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    staff: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
    achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
    level: { type: String, enum: Object.values(LevelEnum), required: true },
    gender: { type: String, enum: Object.values(GenderEnum), required: true },
    leagues: [{ type: String, enum: Object.values(LeagueEnum) }],
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const TeamModel = model<TeamDocument>("Team", TeamSchema);
