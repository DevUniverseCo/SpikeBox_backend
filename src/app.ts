import { MongoConnection } from "./infrastructure/utils/database/mongoConnection";

import autoLoad from "@fastify/autoload";
import { ObjectId } from "mongodb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { BaseService } from "./application/base/baseService";
import { Club, CreateClub } from "./application/clubs/model";
import { CreatePlayer, Player } from "./application/players/model";
import { BaseDao } from "./infrastructure/dao/baseDto";
import { registerErrorHandler } from "./infrastructure/http/hooks/errorsHandler";
import { config } from "./infrastructure/utils/config/mongoConfig";
import { logger } from "./infrastructure/utils/logger/logger";
import { FastifyApp } from "./infrastructure/utils/server/fastify";

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

      // const playersRepository: IPlayerRepository = new PlayerDao(db);
      // const playerService = new PlayerService(playersRepository);

      // const clubsRepository: IClubRepository = new ClubDao(db);
      // const clubService = new ClubService(clubsRepository);

      // Player
      const playerRepo = new BaseDao<Player & { _id: ObjectId }, CreatePlayer>(
        db,
        "players"
      );
      const playerService = new BaseService(playerRepo);
      app.decorate("playerService", playerService);

      // Club
      const clubRepo = new BaseDao<Club & { _id: ObjectId }, CreateClub>(
        db,
        "clubs"
      );
      const clubService = new BaseService(clubRepo);
      app.decorate("clubService", clubService);

      app.register(autoLoad, {
        dir: join(__dirname, "infrastructure/http/routes"),
        options: { prefix: "/api" },
      });

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
