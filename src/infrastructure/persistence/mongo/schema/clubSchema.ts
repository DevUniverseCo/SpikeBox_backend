import { model, Schema } from "mongoose";
import { ContactEnum } from "../../../../application/common/enums/contactEnum";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { LocationEnum } from "../../../../application/common/enums/locationEnum";
import { PlatformEnum } from "../../../../application/common/enums/platformEnum";
import { Club } from "../../../../application/domain/club";

export type ClubDocument = Club & Document;

const contactSchema = new Schema(
  Object.fromEntries(
    Object.values(ContactEnum).map((key) => [key, { type: String }])
  ),
  { _id: false }
);

const platformSchema = new Schema(
  Object.fromEntries(
    Object.values(PlatformEnum).map((key) => [key, { type: String }])
  ),
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

const ClubSchema = new Schema<ClubDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    foundationYear: { type: Number },
    logoUrl: { type: String },
    contact: { type: contactSchema },
    location: { type: locationSchema },
    platform: { type: platformSchema },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

// Virtuals - retrieve associated teams
ClubSchema.virtual("teams", {
  ref: "Team",
  localField: "_id",
  foreignField: "club",
  justOne: false,
});

ClubSchema.set("toObject", { virtuals: true });
ClubSchema.set("toJSON", { virtuals: true });

export const ClubModel = model<ClubDocument>("Club", ClubSchema);
