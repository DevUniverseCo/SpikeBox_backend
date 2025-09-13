import fp from "fastify-plugin";
import { Db } from "mongodb";
import { BaseService } from "../../application/entities/base/baseService";
import { Club, CreateClub } from "../../application/entities/clubs/model";
import { ExperienceService } from "../../application/entities/experiences/experienceService";
import { PlayerService } from "../../application/entities/players/playerService";
import { BaseDao } from "../dao/baseDao";
import { ExperienceDao } from "../dao/experienceDao";
import { PlayerDao } from "../dao/playerDao";

declare module "fastify" {
  interface FastifyInstance {
    playerService: PlayerService;
    experienceService: ExperienceService;
    clubService: BaseService<Club, CreateClub>;
    db: Db;
  }
}

export default fp(async (fastify) => {
  const clubsCollection = fastify.db.collection("clubs");
  const playersCollection = fastify.db.collection("players");
  const experiencesCollection = fastify.db.collection("experiences");

  const playerDao = new PlayerDao(playersCollection);
  const experienceDao = new ExperienceDao(experiencesCollection);
  const clubBaseDao = new BaseDao<Club, CreateClub>(clubsCollection);

  // club
  const clubBaseService = new BaseService(clubBaseDao);
  fastify.decorate("clubService", clubBaseService);

  // players
  const playerService = new PlayerService(playerDao, experienceDao);
  fastify.decorate("playerService", playerService);

  // experience
  const experienceService = new ExperienceService(playerDao, experienceDao);
  fastify.decorate("experienceService", experienceService);
});
