import fp from "fastify-plugin";
import { Db } from "mongodb";
import { BaseService } from "../../application/core/base/baseService";
import { Club, CreateClub } from "../../application/core/clubs/model";
import { HistoryService } from "../../application/core/histories/historyService";
import { PlayerService } from "../../application/core/players/playerService";
import { BaseDao } from "../dao/baseDao";
import { HistoryDao } from "../dao/historyDao";
import { PlayerDao } from "../dao/playerDao";

declare module "fastify" {
  interface FastifyInstance {
    playerService: PlayerService;
    experienceService: HistoryService;
    clubService: BaseService<Club, CreateClub>;
    db: Db;
  }
}

export default fp(async (fastify) => {
  const clubsCollection = fastify.db.collection("clubs");
  const playersCollection = fastify.db.collection("players");
  const experiencesCollection = fastify.db.collection("experiences");

  const playerDao = new PlayerDao(playersCollection);
  const experienceDao = new HistoryDao(experiencesCollection);
  const clubBaseDao = new BaseDao<Club, CreateClub>(clubsCollection);

  // club
  const clubBaseService = new BaseService(clubBaseDao);
  fastify.decorate("clubService", clubBaseService);

  // players
  const playerService = new PlayerService(playerDao, experienceDao);
  fastify.decorate("playerService", playerService);

  // experience
  const experienceService = new HistoryService(playerDao, experienceDao);
  fastify.decorate("experienceService", experienceService);
});
