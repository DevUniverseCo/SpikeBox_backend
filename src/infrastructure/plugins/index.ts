import fp from "fastify-plugin";
import { Db } from "mongodb";
import { BaseService } from "../../application/entities/base/baseService";
import { Club, CreateClub } from "../../application/entities/clubs/model";
import {
  CreateExperience,
  Experience,
} from "../../application/entities/experiences/model";
import { CreatePlayer, Player } from "../../application/entities/players/model";
import { BaseDao } from "../dao/baseDto";

declare module "fastify" {
  interface FastifyInstance {
    playerService: BaseService<Player, CreatePlayer>;
    clubService: BaseService<Club, CreateClub>;
    experienceService: BaseService<Experience, CreateExperience>;
    db: Db;
  }
}

export default fp(async (fastify) => {
  // players
  const playersCollection = fastify.db.collection("players");
  const playerBaseDao = new BaseDao<Player, CreatePlayer>(playersCollection);
  const playerBaseService = new BaseService(playerBaseDao);
  fastify.decorate("playerService", playerBaseService);

  // clubs
  const clubsCollection = fastify.db.collection("clubs");
  const clubBaseDao = new BaseDao<Club, CreateClub>(clubsCollection);
  const clubBaseService = new BaseService(clubBaseDao);
  fastify.decorate("clubService", clubBaseService);

  // experiences
  const experiencesCollection = fastify.db.collection("experiences");
  const experienceBaseDao = new BaseDao<Experience, CreateExperience>(
    experiencesCollection
  );
  const experienceBaseService = new BaseService(experienceBaseDao);
  fastify.decorate("experienceService", experienceBaseService);
});
