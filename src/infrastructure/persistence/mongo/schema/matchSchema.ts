import { model, Schema } from "mongoose";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { LocationEnum } from "../../../../application/common/enums/locationEnum";
import { StatusEnum } from "../../../../application/common/enums/statusEnum";
import { Match, MatchSet } from "../../../../application/domain/match";

export type MatchDocument = Match & Document;

const MatchSetSchema = new Schema<MatchSet>(
  {
    setNumber: { type: Number, required: true },
    score: {
      teamA: { type: Number, required: true },
      teamB: { type: Number, required: true },
    },
  },
  { _id: false }
);

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

const MatchSchema = new Schema<MatchDocument>(
  {
    season: { type: Schema.Types.ObjectId, ref: "Season", required: true },
    scheduledDate: { type: Date, required: true },
    rescheduledDate: { type: Date },
    location: { type: locationSchema },
    homeTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    awayTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    homeScore: { type: Number },
    awayScore: { type: Number },
    setScores: { type: [MatchSetSchema], default: [] },
    status: { type: String, enum: StatusEnum, required: true },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const MatchModel = model<MatchDocument>("Match", MatchSchema);
