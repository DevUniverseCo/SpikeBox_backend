import { Base } from "../../shared/common/base/domain";
import { ContactType } from "../../shared/common/types/contactType";
import { LocationType } from "../../shared/common/types/locationType";
import { PlatformType } from "../../shared/common/types/platformType";

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
