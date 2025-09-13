import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "dev";
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

interface MongoConfig {
  uri: string;
  dbName: string;
}

interface ServerConfig {
  port: number;
}

export interface AppConfig {
  env: string;
  database: {
    mongo: MongoConfig;
  };
  server: ServerConfig;
}

export const config: AppConfig = {
  env,
  database: {
    mongo: {
      uri:
        process.env.MONGODB_URI ||
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}` +
          `@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
      dbName: process.env.MONGODB_DATABASE || "",
    },
  },
  server: {
    port: Number(process.env.PORT) || 3000,
  },
};
