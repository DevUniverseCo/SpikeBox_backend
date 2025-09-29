import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import { logger } from "../../logger/logger";
import { Database } from "./database";

const { Pool } = pkg;

type PostgresClientParams = {
  user: string;
  password: string;
  host: string;
  dbName: string;
  port?: number;
};

export class PostgresClient {
  private pool: pkg.Pool | null = null;
  private kysely: Kysely<Database> | null = null;
  private readonly config: PostgresClientParams;

  constructor(params: PostgresClientParams) {
    const { user, password, host, dbName, port = 5432 } = params;

    if (!user || !password || !host || !dbName) {
      throw new Error(
        "PostgresClient: user, password, host, and dbName must be provided"
      );
    }

    this.config = { user, password, host, dbName, port };
  }

  /** Connetti al database (idempotente) */
  async connect(): Promise<pkg.Pool> {
    if (!this.pool) {
      this.pool = new Pool({
        user: this.config.user,
        host: this.config.host,
        database: this.config.dbName,
        password: this.config.password,
        port: this.config.port,
      });

      // Inizializza Kysely
      this.kysely = new Kysely<Database>({
        dialect: new PostgresDialect({
          pool: this.pool,
        }),
      });

      // Test connessione
      try {
        const client = await this.pool.connect();
        client.release();
        logger.info("✅ Connected to PostgreSQL via pg Pool with Kysely");
      } catch (err) {
        logger.error("❌ Failed to connect to PostgreSQL", err);
        throw err;
      }
    }

    return this.pool;
  }

  /** Disconnetti dal database */
  async disconnect(): Promise<void> {
    if (this.kysely) {
      await this.kysely.destroy();
      this.kysely = null;
    }
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info("🛑 Disconnected from PostgreSQL");
    }
  }

  /** Restituisce l’istanza pool, throw se non connesso */
  getInstance(): pkg.Pool {
    if (!this.pool) {
      throw new Error(
        "PostgresClient: Database not connected. Call connect() first."
      );
    }
    return this.pool;
  }

  /** Restituisce l’istanza Kysely per query type-safe */
  getKysely(): Kysely<Database> {
    if (!this.kysely) {
      throw new Error(
        "PostgresClient: Database not connected. Call connect() first."
      );
    }
    return this.kysely;
  }
}
