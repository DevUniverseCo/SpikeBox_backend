import { Types } from "mongoose";
import { CountryEnum } from "../common/enums/countryEnum";
import { GenderEnum } from "../common/enums/genderEnum";
import { HandednessEnum } from "../common/enums/handednessEnum";
import { ContactType } from "../common/types/contactType";
import { PlatformType } from "../common/types/platformType";
import { Base } from "./base";

// PLAYER CREATE DTO
export type CreatePlayer = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: GenderEnum;
  heightCm?: number;
  weightKg?: number;
  handedness?: HandednessEnum;
  country?: CountryEnum;
  biography?: string;
  profileImageUrl?: string;
  histories?: Types.ObjectId[];
  achievements?: Types.ObjectId[];
  contact?: ContactType;
  platform?: PlatformType;
};

// PLAYER ENTITY
export type Player = Base & CreatePlayer;

// PLAYER UPDATE DTO
export type UpdatePlayer = Partial<CreatePlayer>;
