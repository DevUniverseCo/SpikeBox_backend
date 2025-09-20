import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateTeam } from "./domain";
import { TeamDocument, TeamModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const teamDao = new BaseDao<TeamDocument, CreateTeam>(TeamModel);
export const teamService = new BaseService(teamDao);

// Optional: factory to get fresh instances (useful in tests)
export function createTeamService() {
  const dao = new BaseDao<TeamDocument, CreateTeam>(TeamModel);
  return new BaseService(dao);
}
