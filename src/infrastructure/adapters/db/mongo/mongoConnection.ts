import { Db, MongoClient } from "mongodb";
import { logger } from "../../../../shared/utils/logger";

export class MongoConnection {
  private readonly client: MongoClient;
  private db: Db | null = null;

  constructor(private readonly uri: string, private readonly dbName: string) {
    if (!uri || !dbName) {
      throw new Error("MongoDBConnection: uri and dbName must be provided");
    }
    this.client = new MongoClient(uri);
  }

  async connect(): Promise<Db> {
    if (this.db) return this.db;
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    logger.info(`✅ Connected to MongoDB: ${this.dbName}`);
    return this.db;
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    logger.info("🛑 Disconnected from MongoDB");
  }

  getDatabase(): Db {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }
}
