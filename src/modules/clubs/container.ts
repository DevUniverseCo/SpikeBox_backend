import { mongoDao } from "../../shared/common/base/persistence/mongoDao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateClub } from "./domain";
import { ClubDocument, ClubModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const clubDao = new mongoDao<ClubDocument, CreateClub>(ClubModel);
export const clubService = new BaseService(clubDao);

// Optional: factory to get fresh instances (useful in tests)
export function createClubService() {
  const dao = new mongoDao<ClubDocument, CreateClub>(ClubModel);
  return new BaseService(dao);
}
