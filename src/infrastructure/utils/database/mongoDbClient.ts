import { Db, MongoClient } from "mongodb";
import { config } from "../config/mongoConfig";
import { logger } from "../logger/logger";

export class MongoDbClient {
  db: Db | null = null;
  private readonly client: MongoClient;
  private uri: string;
  private dbName: string;

  constructor() {
    this.uri = config.database.mongo.uri;
    this.dbName = config.database.mongo.dbName;
    if (!this.uri || !this.dbName) {
      throw new Error(
        "MongoDBConnection: uri and dbName must be provided in config"
      );
    }
    this.client = new MongoClient(this.uri);
  }

  /**
   * Connetti al database (idempotente)
   */
  async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      logger.info(`✅ Connected to MongoDB: ${this.dbName}`);
    }
    return this.db;
  }

  /**
   * Disconnetti dal database
   */
  async disconnect(): Promise<void> {
    await this.client.close();
    this.db = null;
    logger.info("🛑 Disconnected from MongoDB");
  }

  /**
   * Restituisce l'istanza Db, throw se non connesso
   */
  getDatabase(): Db {
    if (!this.db) {
      throw new Error(
        "MongoDbClient: Database not connected. Call connect() first."
      );
    }
    return this.db;
  }
}
