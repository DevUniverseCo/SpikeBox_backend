import { MongoConnection } from "./infrastructure/adapters/db/mongo/mongoConnection";
import { registerErrorHandler } from "./infrastructure/adapters/http/hooks/errorsHandler";
import { FastifyApp } from "./infrastructure/adapters/http/server/fastifyApp";

import autoLoad from "@fastify/autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { IPlayerRepository } from "./application/players/playerRepository";
import { PlayerService } from "./application/players/playerService";
import { PlayerDao } from "./imfrastructure/dao/playerDao";
import { config } from "./shared/utils/config";
import { logger } from "./shared/utils/logger";

export const getDirname = (metaUrl: string) => dirname(fileURLToPath(metaUrl));
export const getFilename = (metaUrl: string) => fileURLToPath(metaUrl);

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

      const playersRepository: IPlayerRepository = new PlayerDao(db);
      const playerService = new PlayerService(playersRepository);

      app.register(autoLoad, {
        dir: join(__dirname, "imfrastructure/http/routes"),
        options: { prefix: "/api", playerService },
      });

      // const mongoAdapters = {
      //   players: new MongoAdapter(db, "players", PlayerMapper),
      //   clubs: new MongoAdapter(db, "clubs", ClubMapper),
      //   experiences: new MongoAdapter(db, "experiences", ExperienceMapper),
      // };

      // const entityMap: Record<string, BaseUseCase<any>> = {
      //   players: new BaseUseCase(mongoAdapters.players),
      //   clubs: new BaseUseCase(mongoAdapters.clubs),
      //   experiences: new BaseUseCase(mongoAdapters.experiences),
      // };

      // registerBaseRoutes(app, entityMap);

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
