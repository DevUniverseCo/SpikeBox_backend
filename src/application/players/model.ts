import { ObjectId } from "mongodb";
import { GenderEnum } from "../../domain/common/enums/genderEnum";
import { PlayerRoleEnum } from "../../domain/common/enums/playerRoleEum";
import { SocialLinks } from "../../domain/common/enums/socialEnum";

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
