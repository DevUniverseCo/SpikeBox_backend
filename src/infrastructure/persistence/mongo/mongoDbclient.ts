import { Db, MongoClient } from "mongodb";
import { logger } from "../../logger/logger";

export class MongoDbClient {
  db: Db | null = null;
  private readonly client: MongoClient;
  private readonly uri: string;
  private readonly dbName: string;

  constructor(params: {
    username: string;
    password: string;
    dbName: string;
    cluster: string;
  }) {
    const { username, password, dbName, cluster } = params;

    if (!username || !password || !dbName || !cluster) {
      throw new Error(
        "MongoDBConnection: username, password, cluster and dbName must be provided"
      );
    }

    this.dbName = dbName;
    this.uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

    this.client = new MongoClient(this.uri);
  }

  /** Connetti al database (idempotente) */
  async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      logger.info(`✅ Connected to MongoDB: ${this.dbName}`);
    }
    return this.db;
  }

  /** Disconnetti dal database */
  async disconnect(): Promise<void> {
    if (this.db) {
      await this.client.close();
      this.db = null;
      logger.info("🛑 Disconnected from MongoDB");
    }
  }

  /** Restituisce l'istanza Db, throw se non connesso */
  getDatabase(): Db {
    if (!this.db) {
      throw new Error(
        "MongoDbClient: Database not connected. Call connect() first."
      );
    }
    return this.db;
  }
}
