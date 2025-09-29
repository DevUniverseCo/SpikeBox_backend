import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/infrastructure/persistence/mongo/use-case";
import { CreateStaffHistory } from "./domain";
import {
  StaffHistoryDocument,
  StaffHistoryModel,
} from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const staffHistoryDao = new BaseDao<
  StaffHistoryDocument,
  CreateStaffHistory
>(StaffHistoryModel);
export const staffHistoryService = new BaseService(staffHistoryDao);

// Optional: factory to get fresh instances (useful in tests)
export function createStaffHistoryService() {
  const dao = new BaseDao<StaffHistoryDocument, CreateStaffHistory>(
    StaffHistoryModel
  );
  return new BaseService(dao);
}
