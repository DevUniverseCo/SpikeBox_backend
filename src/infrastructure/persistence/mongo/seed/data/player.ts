import { Types } from "mongoose";
import { CountryEnum } from "../../../../../application/common/enums/countryEnum";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { HandednessEnum } from "../../../../../application/common/enums/handednessEnum";
import { Player } from "../../../../../application/entities/player";

export const PlayerSeed = (historyIds?: Types.ObjectId[]) => {
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
    profileImageUrl:
      "https://volleybox.net/media/upload/players/17538854998Wy6c.png",
    histories: historyIds,
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
