import { CountryEnum } from "../../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { HandednessEnum } from "../../../../../application/common/enums/handednessEnum";
import { Player } from "../../../../../application/domain/player";

export const PlayerSeed = () => {
  const player: Player = {
    firstName: "Filippo",
    lastName: "Mezzani",
    birthDate: new Date("2004-01-01"),
    gender: GenderEnum.MALE,
    heightCm: 190,
    weightKg: 80,
    handedness: HandednessEnum.LEFT,
    country: CountryEnum.ITA,
    biography: "A promising young volleyball player.",
    imageUrl: "https://volleybox.net/media/upload/players/17538854998Wy6c.png",
    contact: {
      email: "filippo.mezzani@example.com",
    },
    platform: {
      instagram: "https://www.instagram.com/filippo_mezzani",
      facebook: "https://www.facebook.com/filippo.mezzani",
    },
    locked: false,
  };

  return player;
};
