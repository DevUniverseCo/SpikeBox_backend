import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/infrastructure/persistence/mongo/use-case";
import { CreatePlayerHistory } from "./domain";
import {
  PlayerHistoryDocument,
  PlayerHistoryModel,
} from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const playerHistoryDao = new BaseDao<
  PlayerHistoryDocument,
  CreatePlayerHistory
>(PlayerHistoryModel);
export const playerHistoryService = new BaseService(playerHistoryDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPlayerHistoryService() {
  const dao = new BaseDao<PlayerHistoryDocument, CreatePlayerHistory>(
    PlayerHistoryModel
  );
  return new BaseService(dao);
}
