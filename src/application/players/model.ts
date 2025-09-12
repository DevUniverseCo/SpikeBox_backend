import { ObjectId } from "mongodb";
import { GenderEnum } from "../common/enums/genderEnum";
import { PlayerRoleEnum } from "../common/enums/playerRoleEum";
import { SocialLinks } from "../common/enums/socialEnum";

export type CreatePlayer = {
  firstName: string;
  lastName: string;
  role: PlayerRoleEnum;
  biography?: string;
  birthDate?: string;
  nationality?: string;
  gender?: GenderEnum;
  thumbnailUrl?: string;
  socialLinks?: SocialLinks;
};

export type Player = {
  _id?: ObjectId;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreatePlayer;

export type UpdatePlayer = Partial<CreatePlayer>;
