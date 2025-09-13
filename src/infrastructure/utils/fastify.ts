import Fastify, { FastifyInstance } from "fastify";
import { config } from "./config/mongoConfig";
import { logger } from "./logger/logger";

export class FastifyApp {
  private fastify: FastifyInstance;
  private port: number;

  constructor() {
    this.port = config.server.port;
    if (!this.port) {
      throw new Error("FastifyApp: port must be provided in config");
    }

    this.fastify = Fastify({
      logger:
        process.env.NODE_ENV === "prod"
          ? { level: "info" }
          : { level: "debug" },
      ajv: {
        customOptions: {
          coerceTypes: false, // nessuna conversione automatica
          removeAdditional: true, // rimuove extraField e passa la validazione
        },
      },
    });
  }

  getInstance(): FastifyInstance {
    return this.fastify;
  }

  async start(): Promise<void> {
    try {
      await this.fastify.listen({ port: this.port, host: "0.0.0.0" });
      logger.info(`✅ Server listening on port ${this.port}`);
    } catch (error) {
      logger.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    await this.fastify.close();
    logger.info("🛑 Server stopped");
  }
}
