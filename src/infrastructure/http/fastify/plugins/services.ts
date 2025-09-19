import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { CreateClub } from "../../../application/domain/club";
import { CreateTeam } from "../../../application/domain/team";
import { BaseService } from "../../../application/use-cases/baseService";
import { SeasonService } from "../../../application/use-cases/seasonService";
import { BaseDao } from "../../persistence/mongo/dao/baseDao";
import { SeasonDao } from "../../persistence/mongo/dao/seasonDao";
import {
  ClubDocument,
  ClubModel,
} from "../../persistence/mongo/schema/clubSchema";
import { SeasonModel } from "../../persistence/mongo/schema/seasonSchema";
import {
  TeamDocument,
  TeamModel,
} from "../../persistence/mongo/schema/teamSchema";

export const register = fp(async (fastify: FastifyInstance) => {
  // --- DAO istanziati dai modelli Mongoose ---
  const clubDao = new BaseDao<ClubDocument, CreateClub>(ClubModel);
  const teamDao = new BaseDao<TeamDocument, CreateTeam>(TeamModel);
  const seasonDao = new SeasonDao(SeasonModel);

  // --- Servizi ---
  const clubBaseService = new BaseService(clubDao);
  const teamBaseService = new BaseService(teamDao);
  const seasonService = new SeasonService(seasonDao);

  // Decora un unico oggetto services
  fastify.decorate("services", {
    clubService: clubBaseService,
    seasonService,
  });
});
