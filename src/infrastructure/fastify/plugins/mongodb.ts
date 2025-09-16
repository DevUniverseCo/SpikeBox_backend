import mongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { logger } from "../../logger/logger";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb",
  });

  fastify.after(() => {
    if (!fastify.mongo?.db) {
      throw new Error("MongoDB connection failed");
    }

    logger.info(`✅ Connected to MongoDB: ${fastify.mongo.db.databaseName}`);

    fastify.mongo.client.on("close", () => {
      logger.warn("⚠️ MongoDB connection closed");
    });

    fastify.mongo.client.on("error", (err: Error) => {
      logger.error("❌ MongoDB client error:", err);
    });
  });
};
