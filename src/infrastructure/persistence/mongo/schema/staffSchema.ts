import { Schema, model } from "mongoose";
import { CountryEnum } from "../../../../application/common/enums/countryEnum";
import { OfficeEnum } from "../../../../application/common/enums/officeEnum";
import { Staff } from "../../../../application/entities/staff";

export type StaffDocument = Staff & Document;

const StaffSchema = new Schema<StaffDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    office: {
      type: [{ type: String, enum: Object.values(OfficeEnum) }],
      required: true,
    },
    country: { type: String, enum: Object.values(CountryEnum) },
    biography: { type: String },
    profileImageUrl: { type: String },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const StaffModel = model<StaffDocument>("Staff", StaffSchema);
