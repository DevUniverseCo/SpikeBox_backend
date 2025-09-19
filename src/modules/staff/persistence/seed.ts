import { CountryEnum } from "../../../shared/common/enums/countryEnum";
import { OfficeEnum } from "../../../shared/common/enums/officeEnum";
import { Staff } from "../domain";

export const StaffSeed = (): Staff[] => {
  return [
    {
      firstName: "Adriano",
      lastName: "Fin",
      office: [OfficeEnum.COACH],
      country: CountryEnum.ITA,
      biography: "Experienced volleyball coach with a passion for the game.",
      imageUrl:
        "https://volleybox.net/media/upload/players/17538854998Wy6c.png",
      locked: false,
    },
    {
      firstName: "Michele",
      lastName: "Viola",
      office: [OfficeEnum.DIRECTOR],
      country: CountryEnum.ITA,
      biography: "Director with extensive experience in sports management.",
      imageUrl:
        "https://volleybox.net/media/upload/players/1714587455uwrN8.png",
      locked: false,
    },
    {
      firstName: "Andrea",
      lastName: "Scattolini",
      office: [OfficeEnum.ATHLETIC_TRAINER],
      country: CountryEnum.ITA,
      biography:
        "Athletic trainer with a focus on injury prevention and rehabilitation.",
      locked: false,
    },
    {
      firstName: "Riccardo",
      lastName: "Fiori",
      office: [OfficeEnum.PRESS_OFFICER],
      country: CountryEnum.ITA,
      biography:
        "Press officer with a focus on media relations and communication.",
      locked: false,
    },
    {
      firstName: "Gianni",
      lastName: "Baldi",
      office: [OfficeEnum.MANAGER],
      country: CountryEnum.ITA,
      biography:
        "Manager with a focus on team leadership and performance optimization.",
      locked: false,
    },
  ];
};
