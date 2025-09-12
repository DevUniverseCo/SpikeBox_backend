import Fastify, { FastifyInstance } from "fastify";
import { logger } from "../../../../shared/utils/logger";

export class FastifyApp {
  private fastify!: FastifyInstance;

  constructor(private readonly port: number) {}

  init(): void {
    this.fastify = Fastify({
      logger:
        process.env.NODE_ENV === "prod"
          ? { level: "info" }
          : { level: "debug" },
      ajv: {
        customOptions: {
          coerceTypes: false, // nessuna conversione automatica
          removeAdditional: true, // rimuove automaticamente extraField e passa la validazione.
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
