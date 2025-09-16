import autoLoad from "@fastify/autoload";
import Fastify from "fastify";
import path from "path";

import { logger } from "./infrastructure/logger/logger";

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

  await fastify.register(autoLoad, {
    dir: path.join(__dirname, "infrastructure/fastify/plugins"),
  });

  await fastify.register(autoLoad, {
    dir: path.join(__dirname, "infrastructure/http/routes"),
    options: { prefix: "/api" },
  });

  fastify.get("/ping", async () => ({ pong: "it works!" }));

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
