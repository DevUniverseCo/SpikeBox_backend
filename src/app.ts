import { MongoAdapter } from "./infrastructure/adapters/db/mongo/mongoAdapter";
import { MongoConnection } from "./infrastructure/adapters/db/mongo/mongoConnection";
import { registerErrorHandler } from "./infrastructure/adapters/http/hooks/errorsHandler";
import { registerBaseRoutes } from "./infrastructure/adapters/http/routes/baseRoutes";
import { FastifyApp } from "./infrastructure/adapters/http/server/fastifyApp";
import { ClubMapper } from "./infrastructure/mappers/clubMapper";
import { ExperienceMapper } from "./infrastructure/mappers/experienceMapper";
import { PlayerMapper } from "./infrastructure/mappers/playerMapper";

import { config } from "./shared/utils/config";
import { logger } from "./shared/utils/logger";
import { BaseUseCase } from "./use-cases/baseUseCase";

export class Application {
  private readonly fastifyApp: FastifyApp;
  private readonly dbConnection: MongoConnection;

  constructor() {
    const { uri, name } = config.database.mongo;
    const port = config.server.port;

    this.dbConnection = new MongoConnection(uri, name);
    this.fastifyApp = new FastifyApp(port);
  }

  async bootstrap(): Promise<FastifyApp> {
    try {
      await this.dbConnection.connect();

      this.fastifyApp.init();
      const app = this.fastifyApp.getInstance();

      // hook
      registerErrorHandler(app);

      const db = this.dbConnection.getDatabase();
      const mongoAdapters = {
        players: new MongoAdapter(db, "players", PlayerMapper),
        clubs: new MongoAdapter(db, "clubs", ClubMapper),
        experiences: new MongoAdapter(db, "experiences", ExperienceMapper),
      };

      const entityMap: Record<string, BaseUseCase<any>> = {
        players: new BaseUseCase(mongoAdapters.players),
        clubs: new BaseUseCase(mongoAdapters.clubs),
        experiences: new BaseUseCase(mongoAdapters.experiences),
      };

      registerBaseRoutes(app, entityMap);

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
        await this.dbConnection.disconnect();
        process.exit(0);
      });
    });
  }
}
