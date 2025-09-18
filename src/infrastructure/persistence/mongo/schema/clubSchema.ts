import { model, Schema, Types } from "mongoose";
import { ContactEnum } from "../../../../application/common/enums/contactEnum";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { PlatformEnum } from "../../../../application/common/enums/platformEnum";
import { Club } from "../../../../application/entities/club";

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

const ClubSchema = new Schema<ClubDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    foundationYear: { type: Number },
    town: { type: String },
    country: { type: String, enum: Object.values(CountryEnum) },
    logoUrl: { type: String },
    contact: { type: contactSchema },
    platform: { type: platformSchema },
    teams: [{ type: Types.ObjectId, ref: "Team" }],
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const ClubModel = model<ClubDocument>("Club", ClubSchema);
