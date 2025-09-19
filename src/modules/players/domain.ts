import { Base } from "../../shared/common/base/domain";
import { CountryEnum } from "../../shared/common/enums/countryEnum";
import { GenderEnum } from "../../shared/common/enums/genderEnum";
import { HandednessEnum } from "../../shared/common/enums/handednessEnum";
import { ContactType } from "../../shared/common/types/contactType";
import { PlatformType } from "../../shared/common/types/platformType";

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
