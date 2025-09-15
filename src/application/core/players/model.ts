import { CountryEnum } from "../../common/enums/countryEnum";
import { GenderEnum } from "../../common/enums/genderEnum";
import { PlatformType } from "../../common/types/platformType";
import { Experience } from "../experiences/model";

export type CreatePlayer = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: GenderEnum;
  heightCm?: number;
  weightKg?: number;
  country?: CountryEnum;
  biography?: string;
  profileImageUrl?: string;
  platform?: PlatformType;
};

export type Player = {
  _id: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreatePlayer;

export type UpdatePlayer = Partial<CreatePlayer>;

export type PlayerWithExperiences = Player & { experiences: Experience[] };
