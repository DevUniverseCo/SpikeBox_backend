import { mongoDao } from "../../shared/common/base/persistence/daos/mongoDao";
import { BaseUseCase } from "../../shared/common/base/use-case";
import { CreateStaff } from "./domain";
import { StaffDocument, StaffModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const staffDao = new mongoDao<StaffDocument, CreateStaff>(StaffModel);
export const staffService = new BaseUseCase(staffDao);

// Optional: factory to get fresh instances (useful in tests)
export function createStaffService() {
  const dao = new mongoDao<StaffDocument, CreateStaff>(StaffModel);
  return new BaseUseCase(dao);
}
