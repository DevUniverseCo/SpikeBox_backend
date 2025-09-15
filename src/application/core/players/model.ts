import { CountryEnum } from "../../common/enums/countryEnum";
import { GenderEnum } from "../../common/enums/genderEnum";
import { PlatformType } from "../../common/types/platformType";
import { Base } from "../base/model";
import { History } from "../histories/model";

export type CreatePlayer = {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: GenderEnum;
  heightCm?: number;
  weightKg?: number;
  country?: CountryEnum;
  biography?: string;
  profileImageUrl?: string;
  platform?: PlatformType;
};

export type Player = Base & CreatePlayer;

export type UpdatePlayer = Partial<CreatePlayer>;

export type PlayerWithExperiences = Player & { experiences: History[] };

const players: Player[] = [
  {
    _id: "player001",
    locked: false,
    createdAt: new Date("2024-01-10T10:00:00.000Z"),
    updatedAt: new Date("2024-01-10T10:00:00.000Z"),
    firstName: "Luca",
    lastName: "Rossi",
    birthDate: new Date("2006-03-15"),
    gender: GenderEnum.MALE,
    heightCm: 185,
    weightKg: 78,
    country: CountryEnum.ITA,
    biography: "Giocatore promettente della squadra U17 maschile.",
    profileImageUrl: "https://example.com/images/players/luca_rossi.png",
    platform: {
      instagram: "https://www.instagram.com/luca_rossi",
      facebook: "https://www.facebook.com/luca.rossi",
    },
  },
  {
    _id: "player002",
    locked: false,
    createdAt: new Date("2024-01-12T11:00:00.000Z"),
    updatedAt: new Date("2024-01-12T11:00:00.000Z"),
    firstName: "Giulia",
    lastName: "Bianchi",
    birthDate: new Date("2005-07-22"),
    gender: GenderEnum.FEMALE,
    heightCm: 172,
    weightKg: 65,
    country: CountryEnum.ITA,
    biography: "Capitana della squadra U17 femminile, ruolo palleggiatrice.",
    profileImageUrl: "https://example.com/images/players/giulia_bianchi.png",
    platform: {
      instagram: "https://www.instagram.com/giulia_bianchi",
    },
  },
  {
    _id: "player003",
    locked: false,
    createdAt: new Date("2024-01-15T09:30:00.000Z"),
    updatedAt: new Date("2024-01-15T09:30:00.000Z"),
    firstName: "Marco",
    lastName: "Verdi",
    birthDate: new Date("2004-11-05"),
    gender: GenderEnum.MALE,
    heightCm: 190,
    weightKg: 82,
    country: CountryEnum.ITA,
    biography: "Giocatore della prima squadra maschile, ruolo centrale.",
    profileImageUrl: "https://example.com/images/players/marco_verdi.png",
  },
  {
    _id: "player004",
    locked: false,
    createdAt: new Date("2024-01-20T14:15:00.000Z"),
    updatedAt: new Date("2024-01-20T14:15:00.000Z"),
    firstName: "Sara",
    lastName: "Neri",
    birthDate: new Date("2007-05-30"),
    gender: GenderEnum.FEMALE,
    heightCm: 168,
    weightKg: 60,
    country: CountryEnum.ITA,
    biography: "Giocatrice giovane e promettente del settore giovanile.",
    profileImageUrl: "https://example.com/images/players/sara_neri.png",
    platform: {},
  },
  {
    _id: "player005",
    locked: false,
    createdAt: new Date("2024-01-25T16:00:00.000Z"),
    updatedAt: new Date("2024-01-25T16:00:00.000Z"),
    firstName: "Alex",
    lastName: "Ferrari",
    birthDate: new Date("2003-02-18"),
    gender: GenderEnum.MALE,
    heightCm: 192,
    weightKg: 85,
    country: CountryEnum.ITA,
    biography: "Ruolo opposto della prima squadra maschile.",
    profileImageUrl: "https://example.com/images/players/alex_ferrari.png",
    platform: {
      instagram: "https://www.instagram.com/alex_ferrari",
    },
  },
];
