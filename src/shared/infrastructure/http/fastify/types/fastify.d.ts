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
  }
}
