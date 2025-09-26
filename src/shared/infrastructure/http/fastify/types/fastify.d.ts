import "fastify";
import { Mongoose } from "mongoose";
import { Pool } from "pg";

declare module "fastify" {
  interface FastifyInstance {
    /** Config generali dell’app */
    config: {
      NODE_ENV: "dev" | "prod";
      PORT: number;
    };

    /** Config MongoDB */
    mongoConfig: {
      USERNAME: string;
      PASSWORD: string;
      DATABASE: string;
      CLUSTER: string;
    };

    /** Config PostgreSQL */
    pgConfig: {
      USERNAME: string;
      PASSWORD: string;
      DATABASE: string;
      HOST: string;
      PORT: number;
    };

    /** Database instances opzionali */
    database?: {
      mongo?: Mongoose;
      pg?: Pool;
    };
  }
}
