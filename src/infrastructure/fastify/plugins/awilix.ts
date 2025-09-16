import { fastifyAwilixPlugin } from "@fastify/awilix";
import { asClass, asValue, createContainer } from "awilix";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Db, MongoClient, ObjectId } from "mongodb";
import { BaseService } from "../../../application/core/base/baseService";
import { HistoryService } from "../../../application/core/histories/historyService";
import { PlayerService } from "../../../application/core/players/playerService";
import { logger } from "../../logger/logger";
import { BaseDao } from "../../persistence/mongo/dao/baseDao";
import { HistoryDao } from "../../persistence/mongo/dao/historyDao";
import { PlayerDao } from "../../persistence/mongo/dao/playerDao";

declare module "fastify" {
  interface FastifyInstance {
    mongo: {
      client: MongoClient;
      db: Db;
      ObjectId: typeof ObjectId;
    };
  }
}

export const register = fp(async (fastify: FastifyInstance) => {
  fastify.after(() => {
    if (!fastify.mongo?.db) {
      throw new Error("MongoDB is not ready yet");
    }

    logger.info("🔧 Setting up Awilix dependency injection...");

    const container = createContainer();

    // DAO registration
    container.register({
      clubDao: asClass(BaseDao).scoped(),
      playerDao: asClass(PlayerDao).scoped(),
      historyDao: asClass(HistoryDao).scoped(),
    });

    // Service registration
    container.register({
      clubService: asClass(BaseService).scoped(),
      playerService: asClass(PlayerService).scoped(),
      historyService: asClass(HistoryService).scoped(),
    });

    // Collections
    container.register({
      clubsCollection: asValue(fastify.mongo.db.collection("clubs")),
      playersCollection: asValue(fastify.mongo.db.collection("players")),
      historiesCollection: asValue(fastify.mongo.db.collection("histories")),
    });

    // Integrazione con Awilix
    fastify.register(fastifyAwilixPlugin, {
      disposeOnClose: true,
      disposeOnResponse: true,
      container,
    });
  });
});
