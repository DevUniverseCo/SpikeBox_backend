import Fastify, { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { BaseService } from "../../../application/base/baseService";
import { Club, CreateClub } from "../../../application/clubs/model";
import { CreatePlayer, Player } from "../../../application/players/model";
import { logger } from "../logger/logger";

declare module "fastify" {
  interface FastifyInstance {
    playerService: BaseService<Player & { _id: ObjectId }, CreatePlayer>;
    clubService: BaseService<Club & { _id: ObjectId }, CreateClub>;
  }
}

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
