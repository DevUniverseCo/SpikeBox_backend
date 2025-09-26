import { mongoDao } from "../../shared/common/base/persistence/mongoDao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateSeason } from "./domain";
import { SeasonDocument, SeasonModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const seasonDao = new mongoDao<SeasonDocument, CreateSeason>(
  SeasonModel
);
export const seasonService = new BaseService(seasonDao);

// Optional: factory to get fresh instances (useful in tests)
export function createSeasonService() {
  const dao = new mongoDao<SeasonDocument, CreateSeason>(SeasonModel);
  return new BaseService(dao);
}
