import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";
import { OfficeEnum } from "../../shared/common/enums/officeEnum";

export type CreateStaffHistory = {
  staff: Types.ObjectId;
  team: Types.ObjectId;
  season: Types.ObjectId;
  office: OfficeEnum[];
};

export type StaffHistory = Base & CreateStaffHistory;
export type UpdateStaffHistory = Partial<CreateStaffHistory>;
