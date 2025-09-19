import { CountryEnum } from "../../../shared/common/enums/countryEnum";
import { Club } from "../domain";

export const ClubSeed = () => {
  const club: Club = {
    name: "Volley Veneto Cavaion",
    description: "A prominent volleyball club based in Veneto.",
    foundationYear: 2015,
    logoUrl: "https://volleybox.net/media/upload/teams/16248809417EijP.png",
    contact: {
      email: "info@volleyvenetocavaion.it",
    },
    location: {
      address: "Via XX Settembre, 12",
      city: "Bardolino",
      postalCode: "37011",
      province: "Verona",
      country: CountryEnum.ITA,
      venueName: "Palazzetto dello Sport",
    },
    platform: {
      facebook: "https://www.facebook.com/volleyvenetocavaion",
      instagram: "https://www.instagram.com/volleyvenetocavaion",
    },
    locked: false,
  };
  return club;
};
