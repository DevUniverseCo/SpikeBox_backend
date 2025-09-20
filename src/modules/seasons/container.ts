import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateSeason } from "./domain";
import { SeasonDocument, SeasonModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const seasonDao = new BaseDao<SeasonDocument, CreateSeason>(SeasonModel);
export const seasonService = new BaseService(seasonDao);

// Optional: factory to get fresh instances (useful in tests)
export function createSeasonService() {
  const dao = new BaseDao<SeasonDocument, CreateSeason>(SeasonModel);
  return new BaseService(dao);
}
