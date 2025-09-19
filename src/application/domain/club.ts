import { ContactType } from "../common/types/contactType";
import { LocationType } from "../common/types/locationType";
import { PlatformType } from "../common/types/platformType";
import { Base } from "./base";

export type CreateClub = {
  name: string;
  description?: string;
  foundationYear?: number;
  logoUrl?: string;
  contact?: ContactType;
  location?: LocationType;
  platform?: PlatformType;
};

export type Club = Base & CreateClub;
export type UpdateClub = Partial<CreateClub>;
