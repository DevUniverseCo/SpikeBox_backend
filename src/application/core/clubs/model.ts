import { ContactType } from "../../common/types/contactType";
import { PlatformType } from "../../common/types/platformType";
import { Base } from "../base/model";

export type CreateClub = {
  name: string;
  description?: string;
  foundationYear?: number;
  clubImageUrl?: string;
  contact?: ContactType;
  platform?: PlatformType;
};

export type Club = Base & CreateClub;

export type UpdateClub = Partial<CreateClub>;

const clubs: Club[] = [
  {
    _id: "123456789abcdef01234567",
    locked: false,
    createdAt: new Date("2023-05-10T10:00:00.000Z"),
    updatedAt: new Date("2023-05-10T10:00:00.000Z"),
    name: "ASD Volley Veneto Cavaion",
    description: "Società sportiva dilettantistica di pallavolo",
    foundationYear: 2015,
    clubImageUrl: "https://example.com/images/asd-volley-veneto.png",
    contact: {
      phone: "+39 049 1234567",
      email: "info@asdvolleyveneto.it",
      address: "Via Roma 10, 35010 Cavaion Veronese (VR)",
    },
    platform: {
      facebook: "https://www.facebook.com/asdvolleyveneto",
      instagram: "https://www.instagram.com/asdvolleyveneto",
    },
  },
  {
    _id: "987654321abcdef01234567",
    locked: false,
    createdAt: new Date("2023-05-15T09:00:00.000Z"),
    updatedAt: new Date("2023-05-15T09:00:00.000Z"),
    name: "Polisportiva Pallavolo Verona",
    description: "Club storico di pallavolo",
    foundationYear: 1998,
    clubImageUrl: "https://example.com/images/pallavolo-verona.png",
    contact: {
      phone: "+39 045 7654321",
      email: "info@pallavoloverona.it",
      address: "Piazza Dante 25, 37121 Verona (VR)",
    },
    platform: {
      facebook: "https://www.facebook.com/pallavoloverona",
      instagram: "https://www.instagram.com/pallavoloverona",
      youtube: "https://www.youtube.com/@pallavoloverona",
    },
  },
];
