import { mongoDao } from "../../shared/common/base/persistence/daos/mongoDao";
import { BaseUseCase } from "../../shared/common/base/use-case";
import { CreateSeason } from "./domain";
import { SeasonDocument, SeasonModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const seasonDao = new mongoDao<SeasonDocument, CreateSeason>(
  SeasonModel
);
export const seasonService = new BaseUseCase(seasonDao);

// Optional: factory to get fresh instances (useful in tests)
export function createSeasonService() {
  const dao = new mongoDao<SeasonDocument, CreateSeason>(SeasonModel);
  return new BaseUseCase(dao);
}
