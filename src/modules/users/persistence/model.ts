import { Schema, model } from "mongoose";
import { RoleEnum } from "../../../shared/common/enums/roleEnum";
import { User } from "../domain";

export type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      required: true,
      default: RoleEnum.USER,
    },
    imageUrl: { type: String },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);
