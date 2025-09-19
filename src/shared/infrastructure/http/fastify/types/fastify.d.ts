import "fastify";
import { Mongoose } from "mongoose";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: "dev" | "prod";
      PORT: number;
      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;
      MONGODB_DATABASE: string;
      MONGODB_CLUSTER: string;
    };
    database?: {
      mongoose: Mongoose;
    };
    services: {
      clubService: BaseService<ClubDocument, CreateClub>;
      playerService: BaseService<PlayerDocument, CreatePlayer>;
      staffService: BaseService<StaffDocument, CreateStaff>;
      historyService: BaseService<HistoryDocument, CreateHistory>;
      achievementService: BaseService<AchievementDocument, CreateAchievement>;
      teamService: BaseService<TeamDocument, CreateTeam>;
      seasonService: SeasonService;
    };
  }
}
