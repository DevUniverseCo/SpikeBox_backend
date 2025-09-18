import { Types } from "mongoose";
import { CountryEnum } from "../common/enums/countryEnum";
import { ContactType } from "../common/types/contactType";
import { PlatformType } from "../common/types/platformType";
import { Base } from "./base";

export type CreateClub = {
  name: string;
  description?: string;
  foundationYear?: number; // es. 1908
  town?: string;
  country?: CountryEnum;
  logoUrl?: string;
  contact?: ContactType;
  platform?: PlatformType;
  teams?: Types.ObjectId[]; // ref Team
};

export type Club = Base & CreateClub;

export type UpdateClub = Partial<CreateClub>;
