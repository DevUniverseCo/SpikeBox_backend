import { mongoDao } from "../../shared/common/base/persistence/mongoDao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreatePlayer } from "./domain";
import { PlayerDocument, PlayerModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const playerDao = new mongoDao<PlayerDocument, CreatePlayer>(
  PlayerModel
);
export const playerService = new BaseService(playerDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPlayerService() {
  const dao = new mongoDao<PlayerDocument, CreatePlayer>(PlayerModel);
  return new BaseService(dao);
}
