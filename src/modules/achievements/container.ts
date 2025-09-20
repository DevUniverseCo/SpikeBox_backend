import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateAchievement } from "./domain";
import { AchievementDocument, AchievementModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const achievementDao = new BaseDao<
  AchievementDocument,
  CreateAchievement
>(AchievementModel);
export const achievementService = new BaseService(achievementDao);

// Optional: factory to get fresh instances (useful in tests)
export function createAchievementService() {
  const dao = new BaseDao<AchievementDocument, CreateAchievement>(
    AchievementModel
  );
  return new BaseService(dao);
}
