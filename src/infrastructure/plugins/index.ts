import fp from "fastify-plugin";
import { Db } from "mongodb";
import { BaseService } from "../../application/base/baseService";
import { CreatePlayer, Player } from "../../application/players/model";
import { BaseDao } from "../dao/baseDto";

declare module "fastify" {
  interface FastifyInstance {
    playerService: BaseService<Player, CreatePlayer>;
    db: Db;
  }
}

export default fp(async (fastify) => {
  // players
  const playersCollection = fastify.db.collection("players");
  const playerBaseDao = new BaseDao<Player, CreatePlayer>(playersCollection);
  const playerBaseService = new BaseService(playerBaseDao);
  fastify.decorate("playerService", playerBaseService);
});
