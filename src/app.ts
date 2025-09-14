import { MongoDbClient } from "./infrastructure/utils/database/mongoDbClient";

import autoLoad from "@fastify/autoload";
import { join } from "path";
import { errorHook } from "./infrastructure/http/hooks/errorsHook";
import { FastifyApp } from "./infrastructure/utils/fastify";
import { logger } from "./infrastructure/utils/logger/logger";

export class Application {
  private readonly fastifyApp: FastifyApp;
  private readonly mongoDbClient: MongoDbClient;

  constructor() {
    this.mongoDbClient = new MongoDbClient();
    this.fastifyApp = new FastifyApp();
  }

  async bootstrap(): Promise<FastifyApp> {
    try {
      await this.mongoDbClient.connect();
      this.fastifyApp
        .getInstance()
        .decorate("db", this.mongoDbClient.getDatabase());

      // Auto-load plugins and routes
      this.fastifyApp.getInstance().register(autoLoad, {
        dir: join(__dirname, "infrastructure/plugins"),
      });
      this.fastifyApp.getInstance().register(autoLoad, {
        dir: join(__dirname, "infrastructure/http/routes"),
        options: { prefix: "/api" },
      });

      // hook
      errorHook(this.fastifyApp.getInstance());

      this.setupGracefulShutdown();

      return this.fastifyApp;
    } catch (error) {
      logger.error("❌ Failed to bootstrap application:", error);
      throw error;
    }
  }

  private setupGracefulShutdown(): void {
    const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.info(`🛑 Received ${signal}, shutting down gracefully...`);

        await this.fastifyApp.stop();
        await this.mongoDbClient.disconnect();
        process.exit(0);
      });
    });
  }
}
