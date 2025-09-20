import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateHistory } from "./domain";
import { HistoryDocument, HistoryModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const historyDao = new BaseDao<HistoryDocument, CreateHistory>(
  HistoryModel
);
export const historyService = new BaseService(historyDao);

// Optional: factory to get fresh instances (useful in tests)
export function createHistoryService() {
  const dao = new BaseDao<HistoryDocument, CreateHistory>(HistoryModel);
  return new BaseService(dao);
}
