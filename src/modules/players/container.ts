import { mongoDao } from "../../shared/common/base/persistence/daos/mongoDao";
import { BaseUseCase } from "../../shared/common/base/use-case";
import { CreatePlayer } from "./domain";
import { PlayerDocument, PlayerModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const playerDao = new mongoDao<PlayerDocument, CreatePlayer>(
  PlayerModel
);
export const playerService = new BaseUseCase(playerDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPlayerService() {
  const dao = new mongoDao<PlayerDocument, CreatePlayer>(PlayerModel);
  return new BaseUseCase(dao);
}
