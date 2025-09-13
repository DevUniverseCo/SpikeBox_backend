import { ObjectId } from "mongodb";
import { SocialLinks } from "../common/enums/socialEnum";

export type CreateClub = {
  name: string;
  city?: string;
  country?: string;
  foundationYear?: number;
  website?: string;
  logoUrl?: string;
  socialLinks?: SocialLinks;
};

export type Club = {
  readonly _id?: ObjectId;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateClub;

export type UpdateClub = Partial<CreateClub>;
