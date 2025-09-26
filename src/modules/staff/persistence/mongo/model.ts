import { Schema, model } from "mongoose";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { Staff } from "../../domain";

export type StaffDocument = Staff & Document;

const StaffSchema = new Schema<StaffDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    country: { type: String, enum: Object.values(CountryEnum) },
    biography: { type: String },
    imageUrl: { type: String },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const StaffModel = model<StaffDocument>("Staff", StaffSchema);
