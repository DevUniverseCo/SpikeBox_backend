import { CountryEnum } from "../common/enums/countryEnum";
import { OfficeEnum } from "../common/enums/officeEnum";
import { Base } from "./base";

export type CreateStaff = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  office: OfficeEnum[];
  country?: CountryEnum;
  biography?: string;
  imageUrl?: string;
};

export type Staff = Base & CreateStaff;
export type UpdateStaff = Partial<CreateStaff>;
