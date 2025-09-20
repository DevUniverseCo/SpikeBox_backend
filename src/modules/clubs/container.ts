import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateClub } from "./domain";
import { ClubDocument, ClubModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const clubDao = new BaseDao<ClubDocument, CreateClub>(ClubModel);
export const clubService = new BaseService(clubDao);

// Optional: factory to get fresh instances (useful in tests)
export function createClubService() {
  const dao = new BaseDao<ClubDocument, CreateClub>(ClubModel);
  return new BaseService(dao);
}
