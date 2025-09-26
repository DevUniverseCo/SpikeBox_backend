import { Pool } from "pg";

export type DatabaseConfig = {
  type: "mongo" | "postgres";
  connection?: {
    postgresPool?: Pool;
  };
};

export class DatabaseConfigurationManager {
  private static instance: DatabaseConfigurationManager;
  private config: DatabaseConfig;

  private constructor() {
    this.config = {
      type: (process.env.DATABASE_TYPE as "mongo" | "postgres") || "mongo",
      connection: {},
    };
  }

  static getInstance(): DatabaseConfigurationManager {
    if (!DatabaseConfigurationManager.instance) {
      DatabaseConfigurationManager.instance =
        new DatabaseConfigurationManager();
    }
    return DatabaseConfigurationManager.instance;
  }

  setPostgresPool(pool: Pool): void {
    this.config.connection = { postgresPool: pool };
  }

  getConfig(): DatabaseConfig {
    return this.config;
  }

  getDatabaseType(): "mongo" | "postgres" {
    return this.config.type;
  }

  getPostgresPool(): Pool | undefined {
    return this.config.connection?.postgresPool;
  }
}
