import { CountryEnum } from "../common/enums/countryEnum";
import { GenderEnum } from "../common/enums/genderEnum";
import { HandednessEnum } from "../common/enums/handednessEnum";
import { ContactType } from "../common/types/contactType";
import { PlatformType } from "../common/types/platformType";
import { Base } from "./base";

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
  imageUrl?: string;
  contact?: ContactType;
  platform?: PlatformType;
};

export type Player = Base & CreatePlayer;
export type UpdatePlayer = Partial<CreatePlayer>;
