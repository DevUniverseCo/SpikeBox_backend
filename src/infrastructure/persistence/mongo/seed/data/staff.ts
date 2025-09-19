import { CountryEnum } from "../../../../../application/common/enums/countryEnum";
import { OfficeEnum } from "../../../../../application/common/enums/officeEnum";
import { Staff } from "../../../../../application/domain/staff";

export const StaffSeed = () => {
  const staff: Staff = {
    firstName: "Adriano",
    lastName: "Fin",
    office: [OfficeEnum.COACH],
    country: CountryEnum.ITA,
    biography: "Experienced volleyball coach with a passion for the game.",
    profileImageUrl:
      "https://volleybox.net/media/upload/players/17538854998Wy6c.png",
    locked: false,
  };
  return staff;
};
