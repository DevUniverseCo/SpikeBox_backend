import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { CreateAchievement } from "../../../../application/domain/achievement";
import { CreateClub } from "../../../../application/domain/club";
import { CreateHistory } from "../../../../application/domain/history";
import { CreatePlayer } from "../../../../application/domain/player";
import { CreateStaff } from "../../../../application/domain/staff";
import { CreateTeam } from "../../../../application/domain/team";
import { BaseService } from "../../../../application/use-cases/baseService";
import { SeasonService } from "../../../../application/use-cases/seasonService";
import { BaseDao } from "../../../persistence/mongo/dao/baseDao";
import { SeasonDao } from "../../../persistence/mongo/dao/seasonDao";
import {
  AchievementDocument,
  AchievementModel,
} from "../../../persistence/mongo/schema/achievementSchema";
import {
  ClubDocument,
  ClubModel,
} from "../../../persistence/mongo/schema/clubSchema";
import {
  HistoryDocument,
  HistoryModel,
} from "../../../persistence/mongo/schema/historySchema";
import {
  PlayerDocument,
  PlayerModel,
} from "../../../persistence/mongo/schema/playerSchema";
import { SeasonModel } from "../../../persistence/mongo/schema/seasonSchema";
import {
  StaffDocument,
  StaffModel,
} from "../../../persistence/mongo/schema/staffSchema";
import {
  TeamDocument,
  TeamModel,
} from "../../../persistence/mongo/schema/teamSchema";

export const register = fp(async (fastify: FastifyInstance) => {
  // --- DAO istanziati dai modelli Mongoose ---
  const clubDao = new BaseDao<ClubDocument, CreateClub>(ClubModel);
  const playerDao = new BaseDao<PlayerDocument, CreatePlayer>(PlayerModel);
  const staffDao = new BaseDao<StaffDocument, CreateStaff>(StaffModel);
  const historyDao = new BaseDao<HistoryDocument, CreateHistory>(HistoryModel);
  const achievementDao = new BaseDao<AchievementDocument, CreateAchievement>(
    AchievementModel
  );
  const teamDao = new BaseDao<TeamDocument, CreateTeam>(TeamModel);
  const seasonDao = new SeasonDao(SeasonModel);

  // --- Servizi ---
  const clubBaseService = new BaseService(clubDao);
  const playerService = new BaseService(playerDao);
  const staffService = new BaseService(staffDao);
  const historyService = new BaseService(historyDao);
  const achievementService = new BaseService(achievementDao);
  const teamService = new BaseService(teamDao);
  const seasonService = new SeasonService(seasonDao);

  // Decora un unico oggetto services
  fastify.decorate("services", {
    clubService: clubBaseService,
    playerService: playerService,
    staffService: staffService,
    historyService: historyService,
    achievementService: achievementService,
    teamService: teamService,
    seasonService: seasonService,
  });
});
