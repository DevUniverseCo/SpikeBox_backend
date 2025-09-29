import { mongoDao } from "../../shared/common/base/persistence/daos/mongoDao";
import { BaseUseCase } from "../../shared/common/base/use-case";
import { CreateStaffHistory } from "./domain";
import {
  StaffHistoryDocument,
  StaffHistoryModel,
} from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const staffHistoryDao = new mongoDao<
  StaffHistoryDocument,
  CreateStaffHistory
>(StaffHistoryModel);
export const staffHistoryService = new BaseUseCase(staffHistoryDao);

// Optional: factory to get fresh instances (useful in tests)
export function createStaffHistoryService() {
  const dao = new mongoDao<StaffHistoryDocument, CreateStaffHistory>(
    StaffHistoryModel
  );
  return new BaseUseCase(dao);
}
