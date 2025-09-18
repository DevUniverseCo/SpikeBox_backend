import { CountryEnum } from "../common/enums/countryEnum";
import { OfficeEnum } from "../common/enums/officeEnum";
import { Base } from "./base";

// PLAYER CREATE DTO
export type CreateStaff = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  office: OfficeEnum[]; // es. "Allenatore", "Preparatore Atletico", etc.
  country?: CountryEnum;
  biography?: string;
  profileImageUrl?: string;
};

// PLAYER ENTITY
export type Staff = Base & CreateStaff;

// PLAYER UPDATE DTO
export type UpdateStaff = Partial<CreateStaff>;
