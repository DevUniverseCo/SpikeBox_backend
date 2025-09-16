import fp from "fastify-plugin";
import { Db } from "mongodb";
import { BaseService } from "../../application/core/base/baseService";
import { Club, CreateClub } from "../../application/core/clubs/model";
import { HistoryService } from "../../application/core/histories/historyService";
import { PlayerService } from "../../application/core/players/playerService";
import { BaseDao } from "../persistence/mongo/dao/baseDao";
import { HistoryDao } from "../persistence/mongo/dao/historyDao";
import { PlayerDao } from "../persistence/mongo/dao/playerDao";

declare module "fastify" {
  interface FastifyInstance {
    playerService: PlayerService;
    historyService: HistoryService;
    clubService: BaseService<Club, CreateClub>;
    db: Db;
  }
}

export default fp(async (fastify) => {
  const clubsCollection = fastify.db.collection("clubs");
  const playersCollection = fastify.db.collection("players");
  const historiesCollection = fastify.db.collection("histories");

  const playerDao = new PlayerDao(playersCollection);
  const historyDao = new HistoryDao(historiesCollection);
  const clubBaseDao = new BaseDao<Club, CreateClub>(clubsCollection);

  // clubs
  const clubBaseService = new BaseService(clubBaseDao);
  fastify.decorate("clubService", clubBaseService);

  // players
  const playerService = new PlayerService(playerDao, historyDao);
  fastify.decorate("playerService", playerService);

  // histories
  const historyService = new HistoryService(playerDao, historyDao);
  fastify.decorate("historyService", historyService);
});
