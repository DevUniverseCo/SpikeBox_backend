import "fastify";

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
      mongo: {
        client: MongoClient;
        db: Db;
      };
    };
  }
}
