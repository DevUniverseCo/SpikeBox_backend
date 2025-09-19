import { model, Schema } from "mongoose";
import { ContactEnum } from "../../../../application/common/enums/contactEnum";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../application/common/enums/genderEnum";
import { HandednessEnum } from "../../../../application/common/enums/handednessEnum";
import { PlatformEnum } from "../../../../application/common/enums/platformEnum";
import { Player } from "../../../../application/domain/player";

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
    imageUrl: { type: String },
    contact: { type: contactSchema },
    platform: { type: platformSchema },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Virtuals - retrieve associated histories and achievements
PlayerSchema.virtual("histories", {
  ref: "History",
  localField: "_id",
  foreignField: "player",
  justOne: false,
});

// Virtuals - retrieve associated teams and achievements
PlayerSchema.virtual("achievements", {
  ref: "Achievement",
  localField: "_id",
  foreignField: "player",
  justOne: false,
});

PlayerSchema.virtual("age").get(function () {
  if (!this.birthDate) return null;
  const diff = new Date().getFullYear() - this.birthDate.getFullYear();
  return diff;
});

PlayerSchema.set("toObject", { virtuals: true });
PlayerSchema.set("toJSON", { virtuals: true });

export const PlayerModel = model<PlayerDocument>("Player", PlayerSchema);
