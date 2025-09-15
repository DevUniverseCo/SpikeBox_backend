import Fastify, { FastifyInstance } from "fastify";
import { config } from "./config/mongoConfig";
import { logger } from "./logger/logger";

export class FastifyApp {
  private fastify!: FastifyInstance;
  private readonly port: number;

  constructor() {
    this.port = config.server.port;
    if (!this.port) {
      throw new Error("FastifyApp: port must be provided in config");
    }
  }

  // Inizializza Fastify e i plugin
  async initFastify(): Promise<void> {
    this.fastify = Fastify({
      logger:
        process.env.NODE_ENV === "prod"
          ? { level: "info" }
          : { level: "debug" },
      ajv: {
        customOptions: {
          coerceTypes: false,
          removeAdditional: true,
        },
      },
    });

    // Registrazione plugin (può essere asincrona)
    await this.fastify.register(import("@fastify/cors"), {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });
  }

  getInstance(): FastifyInstance {
    if (!this.fastify) {
      throw new Error("FastifyApp not initialized. Call init() first.");
    }
    return this.fastify;
  }

  async start(): Promise<void> {
    if (!this.fastify) throw new Error("FastifyApp not initialized");

    try {
      await this.fastify.listen({ port: this.port, host: "0.0.0.0" });
      logger.info(`✅ Server listening on port ${this.port}`);
    } catch (error) {
      logger.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    if (!this.fastify) return;
    await this.fastify.close();
    logger.info("🛑 Server stopped");
  }
}
