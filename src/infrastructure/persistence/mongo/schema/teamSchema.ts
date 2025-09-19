import { model, Schema } from "mongoose";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { LeagueEnum } from "../../../../application/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../application/common/enums/levelEnum ";
import { LocationEnum } from "../../../../application/common/enums/locationEnum";
import { Team } from "../../../../application/domain/team";

export type TeamDocument = Team & Document;

const locationSchema = new Schema(
  {
    [LocationEnum.ADDRESS]: { type: String },
    [LocationEnum.LATITUDE]: { type: Number, min: -90, max: 90 },
    [LocationEnum.LONGITUDE]: { type: Number, min: -180, max: 180 },
    [LocationEnum.VENUE_NAME]: { type: String },
    [LocationEnum.CITY]: { type: String },
    [LocationEnum.PROVINCE]: { type: String },
    [LocationEnum.COUNTRY]: { type: String, enum: Object.values(CountryEnum) },
    [LocationEnum.POSTAL_CODE]: { type: String },
    [LocationEnum.CAPACITY]: { type: Number, min: 0 },
    [LocationEnum.IMAGE_URL]: { type: String },
  },
  { _id: false }
);
const TeamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    location: { type: locationSchema },
    season: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    staff: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
    level: { type: String, enum: Object.values(LevelEnum), required: true },
    gender: { type: String, enum: Object.values(GenderEnum), required: true },
    leagues: [{ type: String, enum: Object.values(LeagueEnum) }],
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

// Virtuals
TeamSchema.virtual("players", {
  ref: "History",
  localField: "_id",
  foreignField: "team",
  justOne: false,
});

TeamSchema.virtual("achievements", {
  ref: "Achievement",
  localField: "_id",
  foreignField: "team",
  justOne: false,
});

export const TeamModel = model<TeamDocument>("Team", TeamSchema);
