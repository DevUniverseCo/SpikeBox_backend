import { Base } from "../../shared/common/base/domain";
import { CountryEnum } from "../../shared/common/enums/countryEnum";

export type CreateStaff = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  country?: CountryEnum;
  biography?: string;
  imageUrl?: string;
};

export type Staff = Base & CreateStaff;
export type UpdateStaff = Partial<CreateStaff>;
