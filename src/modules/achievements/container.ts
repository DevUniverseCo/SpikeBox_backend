import { CreateAchievement } from "./domain";

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
