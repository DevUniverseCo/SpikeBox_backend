import { ContactType } from "../../common/types/contactType";
import { PlatformType } from "../../common/types/platformType";

export type CreateClub = {
  name: string;
  description?: string;
  foundationYear?: number;
  clubImageUrl?: string;
  contact?: ContactType;
  platform?: PlatformType;
};

export type Club = {
  _id: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateClub;

export type UpdateClub = Partial<CreateClub>;
