import { mongoDao } from "../../shared/common/base/persistence/mongoDao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreatePlayerHistory } from "./domain";
import {
  PlayerHistoryDocument,
  PlayerHistoryModel,
} from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const playerHistoryDao = new mongoDao<
  PlayerHistoryDocument,
  CreatePlayerHistory
>(PlayerHistoryModel);
export const playerHistoryService = new BaseService(playerHistoryDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPlayerHistoryService() {
  const dao = new mongoDao<PlayerHistoryDocument, CreatePlayerHistory>(
    PlayerHistoryModel
  );
  return new BaseService(dao);
}
