import autoLoad from "@fastify/autoload";
import Fastify from "fastify";
import path from "path";

import {
  CstPluginErrors,
  CstPluginServices,
  PluginCors,
  PluginEnv,
  PluginHelmet,
  PluginSwaggerCore,
  PluginSwaggerUi,
} from "./infrastructure/fastify";
import { logger } from "./infrastructure/logger/logger";
import { MongoDbClient } from "./infrastructure/persistence/mongo/mongoDbclient";

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

  // Registrazione dei plugin
  await PluginEnv.register(fastify);
  await PluginCors.register(fastify);
  await PluginHelmet.register(fastify);
  await PluginSwaggerCore.register(fastify);
  await PluginSwaggerUi.register(fastify);

  // --- MongoDB ---
  const mongoClient = new MongoDbClient({
    username: fastify.config.MONGODB_USERNAME,
    password: fastify.config.MONGODB_PASSWORD,
    dbName: fastify.config.MONGODB_DATABASE,
    cluster: fastify.config.MONGODB_CLUSTER,
  });

  // --- Start e stop MongoDB con lifecycle hooks ---
  fastify.addHook("onClose", async () => {
    try {
      await mongoClient.disconnect();
    } catch (err) {
      logger.error("❌ Error disconnecting MongoDB:", err);
    }
  });

  await mongoClient.connect();
  fastify.decorate("database", {
    mongo: { client: mongoClient, db: mongoClient.db },
  });
  CstPluginErrors.register(fastify);
  CstPluginServices.register(fastify);

  // Caricamento automatico delle rotte
  await fastify.register(autoLoad, {
    dir: path.join(__dirname, "infrastructure/http/routes"),
    options: { prefix: "/api" },
  });

  // fastify.addHook("onReady", async () => {
  //   try {
  //     await mongoClient.connect();
  //     CstPluginErrors.register(fastify);
  //     CstPluginServices.register(fastify);

  //     // Caricamento automatico delle rotte
  //     await fastify.register(autoLoad, {
  //       dir: path.join(__dirname, "infrastructure/http/routes"),
  //       options: { prefix: "/api" },
  //     });
  //   } catch (err) {
  //     logger.error("❌ Failed to connect to MongoDB:", err);
  //     process.exit(1); // blocca se DB non disponibile
  //   }
  // });

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
