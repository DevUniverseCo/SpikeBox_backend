import { Base } from "../../shared/common/base/domain";
import { CountryEnum } from "../../shared/common/enums/countryEnum";
import { OfficeEnum } from "../../shared/common/enums/officeEnum";

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
