import { model, Schema, Types } from "mongoose";
import { ContactEnum } from "../../../../application/common/enums/contactEnum";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { HandednessEnum } from "../../../../application/common/enums/handednessEnum";
import { PlatformEnum } from "../../../../application/common/enums/platformEnum";
import { Player } from "../../../../application/entities/player";

export type PlayerDocument = Player & Document;

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

const PlayerSchema = new Schema<PlayerDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    gender: { type: String, enum: Object.values(GenderEnum) },
    heightCm: { type: Number },
    weightKg: { type: Number },
    handedness: { type: String, enum: Object.values(HandednessEnum) },
    country: { type: String, enum: Object.values(CountryEnum) },
    biography: { type: String },
    profileImageUrl: { type: String },
    histories: [{ type: Types.ObjectId, ref: "History" }],
    achievements: [{ type: Types.ObjectId, ref: "Achievement" }],
    contact: { type: contactSchema },
    platform: { type: platformSchema },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  {
    timestamps: true, // createdAt e updatedAt automatici
  }
);

// Export del model
export const PlayerModel = model<PlayerDocument>("Player", PlayerSchema);
