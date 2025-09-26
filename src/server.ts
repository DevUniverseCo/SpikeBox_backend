import Fastify from "fastify";

import registerAllPlugins from "./shared/infrastructure/http/fastify/plugins/_index";
import registerAllRoutes from "./shared/infrastructure/http/fastify/routes/_index";
import { logger } from "./shared/infrastructure/logger/logger";
import { MongooseClient } from "./shared/infrastructure/persistence/mongo/client";
import { PostgresClient } from "./shared/infrastructure/persistence/postgres/client";

const buildApp = async () => {
  const fastify = Fastify({
    logger:
      process.env.NODE_ENV === "prod" ? { level: "info" } : { level: "debug" },
    ajv: {
      customOptions: {
        coerceTypes: false,
        removeAdditional: true,
      },
    },
  });

  // Load plugins
  await fastify.register(registerAllPlugins);
  // Load routes with prefix /api/V1
  await fastify.register(registerAllRoutes, { prefix: "/api/V1" });

  // --- MongoDB via Mongoose ---
  const mongooseClient = new MongooseClient({
    username: fastify.mongoConfig.USERNAME,
    password: fastify.mongoConfig.PASSWORD,
    cluster: fastify.mongoConfig.CLUSTER,
    dbName: fastify.mongoConfig.DATABASE,
  });
  // --- PostgreSQL via pg Pool ---
  const postgresClient = new PostgresClient({
    user: fastify.pgConfig.USERNAME,
    password: fastify.pgConfig.PASSWORD,
    host: fastify.pgConfig.HOST,
    dbName: fastify.pgConfig.DATABASE,
    port: fastify.pgConfig.PORT,
  });

  await mongooseClient.connect();
  await postgresClient.connect();

  // Decorate Fastify con Mongoose
  fastify.decorate("database", {
    mongo: mongooseClient.getInstance(),
    pg: postgresClient.getInstance(),
  });

  // Setup graceful shutdown con timeout
  const setupGracefulShutdown = () => {
    const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`🛑 Received ${signal}, shutting down gracefully...`);
        const shutdownTimeout = setTimeout(() => {
          logger.warn("🛑 Shutdown timeout reached, forcing exit.");
          process.exit(1);
        }, 5000);

        try {
          await fastify.close();
          await mongooseClient.disconnect();
          await postgresClient.disconnect();
          clearTimeout(shutdownTimeout);
          logger.info("✅ Fastify server stopped.");
          process.exit(0);
        } catch (err) {
          logger.error("❌ Error during shutdown:", err);
          process.exit(1);
        }
      });
    });
  };

  setupGracefulShutdown();

  return fastify;
};

const server = async () => {
  try {
    const app = await buildApp();
    await app.listen({ port: 3000, host: "0.0.0.0" });
    logger.info("✅ Server listening on port 3000");
  } catch (err) {
    logger.error("❌ Failed to start server:", err);
    console.error(err);
    process.exit(1);
  }
};

server();
