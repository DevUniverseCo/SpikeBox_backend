import { GenderEnum } from "../common/enums/genderEnum";
import { StaffRoleEnum } from "../common/enums/staffRoleEnum";

export type Staff = {
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: GenderEnum;
  birthDate?: string;
  nationality?: string;
  role: StaffRoleEnum;
};
