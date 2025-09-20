import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateStaff } from "./domain";
import { StaffDocument, StaffModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const staffDao = new BaseDao<StaffDocument, CreateStaff>(StaffModel);
export const staffService = new BaseService(staffDao);

// Optional: factory to get fresh instances (useful in tests)
export function createStaffService() {
  const dao = new BaseDao<StaffDocument, CreateStaff>(StaffModel);
  return new BaseService(dao);
}
