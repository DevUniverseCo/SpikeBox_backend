import { mongoDao } from "../../shared/common/base/persistence/mongoDao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateTeam } from "./domain";
import { TeamDocument, TeamModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const teamDao = new mongoDao<TeamDocument, CreateTeam>(TeamModel);
export const teamService = new BaseService(teamDao);

// Optional: factory to get fresh instances (useful in tests)
export function createTeamService() {
  const dao = new mongoDao<TeamDocument, CreateTeam>(TeamModel);
  return new BaseService(dao);
}
