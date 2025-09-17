import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { BaseService } from "../../../application/core/base/baseService";
import { Club, CreateClub } from "../../../application/core/clubs/model";
import { HistoryService } from "../../../application/core/histories/historyService";
import { PlayerService } from "../../../application/core/players/playerService";
import { CreateSeason, Season } from "../../../application/core/seasons/model";
import { CreateTeam, Team } from "../../../application/core/teams/model";
import { BaseDao } from "../../persistence/mongo/daos/baseDao";
import { HistoryDao } from "../../persistence/mongo/daos/historyDao";
import { PlayerDao } from "../../persistence/mongo/daos/playerDao";

export const register = fp(async (fastify: FastifyInstance) => {
  const { client, db } = fastify.database?.mongo || {};
  if (!db) {
    throw new Error("MongoDB is not initialized");
  }

  const clubsCollection = db.collection("clubs");
  const teamsCollection = db.collection("teams");
  const playersCollection = db.collection("players");
  const historiesCollection = db.collection("histories");
  const seasonsCollection = db.collection("seasons");

  const playerDao = new PlayerDao(playersCollection);
  const historyDao = new HistoryDao(historiesCollection);
  const teamBaseDao = new BaseDao<Team, CreateTeam>(teamsCollection);
  const clubBaseDao = new BaseDao<Club, CreateClub>(clubsCollection);
  const seasonBaseDao = new BaseDao<Season, CreateSeason>(seasonsCollection);

  const clubBaseService = new BaseService(clubBaseDao);
  const teamBaseService = new BaseService(teamBaseDao);
  const seasonBaseService = new BaseService(seasonBaseDao);
  const playerService = new PlayerService(playerDao, historyDao);
  const historyService = new HistoryService(playerDao, historyDao);

  // Decora un unico oggetto services
  fastify.decorate("services", {
    clubService: clubBaseService,
    teamService: teamBaseService,
    seasonService: seasonBaseService,
    playerService,
    historyService,
  });
});
