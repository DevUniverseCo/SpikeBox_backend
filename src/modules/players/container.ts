import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreatePlayer } from "./domain";
import { PlayerDocument, PlayerModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const playerDao = new BaseDao<PlayerDocument, CreatePlayer>(PlayerModel);
export const playerService = new BaseService(playerDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPlayerService() {
  const dao = new BaseDao<PlayerDocument, CreatePlayer>(PlayerModel);
  return new BaseService(dao);
}
