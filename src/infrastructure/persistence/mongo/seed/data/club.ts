import { CountryEnum } from "../../../../../application/common/enums/countryEnum";
import { Club } from "../../../../../application/domain/club";

export const ClubSeed = () => {
  const club: Club = {
    name: "Volley Veneto Cavaion",
    description: "A prominent volleyball club based in Veneto.",
    foundationYear: 2015,
    town: "Bardolino",
    country: CountryEnum.ITA,
    contact: {
      email: "info@volleyvenetocavaion.it",
    },
    platform: {
      facebook: "https://www.facebook.com/volleyvenetocavaion",
      instagram: "https://www.instagram.com/volleyvenetocavaion",
    },
    logoUrl: "https://volleybox.net/media/upload/teams/16248809417EijP.png",
    locked: false,
  };
  return club;
};
