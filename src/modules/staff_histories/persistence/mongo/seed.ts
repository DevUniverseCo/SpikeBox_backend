import { Types } from "mongoose";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { OfficeEnum } from "../../../../shared/common/enums/officeEnum";
import { StaffHistory } from "../../domain";

const staffData = [
  {
    firstName: "Adriano",
    lastName: "Fin",
    country: CountryEnum.ITA,
    biography: "Experienced volleyball coach with a passion for the game.",
    imageUrl: "https://volleybox.net/media/upload/players/17538854998Wy6c.png",
    office: [OfficeEnum.COACH],
  },
  {
    firstName: "Michele",
    lastName: "Viola",
    country: CountryEnum.ITA,
    biography: "Director with extensive experience in sports management.",
    imageUrl: "https://volleybox.net/media/upload/players/1714587455uwrN8.png",
    office: [OfficeEnum.DIRECTOR],
  },
  {
    firstName: "Andrea",
    lastName: "Scattolini",
    country: CountryEnum.ITA,
    biography:
      "Athletic trainer with a focus on injury prevention and rehabilitation.",
    office: [OfficeEnum.ATHLETIC_TRAINER],
  },
  {
    firstName: "Riccardo",
    lastName: "Fiori",
    country: CountryEnum.ITA,
    biography:
      "Press officer with a focus on media relations and communication.",
    office: [OfficeEnum.PRESS_OFFICER],
  },
  {
    firstName: "Gianni",
    lastName: "Baldi",
    country: CountryEnum.ITA,
    biography:
      "Manager with a focus on team leadership and performance optimization.",
    office: [OfficeEnum.MANAGER],
  },
];

export const StaffHistorySeed = (
  teamId: Types.ObjectId,
  staffIds: Types.ObjectId[],
  seasonId: Types.ObjectId
): StaffHistory[] => {
  return staffIds.map((staffId, idx) => {
    const staff = staffData[idx];

    const staffHistory: StaffHistory = {
      staff: staffId,
      team: teamId,
      season: seasonId,
      office: staff.office,
      locked: false,
    };

    return staffHistory;
  });
};
