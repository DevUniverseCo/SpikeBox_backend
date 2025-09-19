import mongoose, { Mongoose } from "mongoose";
import { logger } from "../../logger/logger";

export class MongooseClient {
  private mongooseInstance: Mongoose | null = null;
  private readonly uri: string;

  constructor(params: {
    username: string;
    password: string;
    cluster: string;
    dbName: string;
  }) {
    const { username, password, cluster, dbName } = params;

    if (!username || !password || !cluster || !dbName) {
      throw new Error(
        "MongooseClient: username, password, cluster and dbName must be provided"
      );
    }

    this.uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  }

  /** Connetti al database (idempotente) */
  async connect(): Promise<Mongoose> {
    if (!this.mongooseInstance) {
      this.mongooseInstance = await mongoose.connect(this.uri);
      logger.info("✅ Connected to MongoDB via Mongoose");
    }
    return this.mongooseInstance;
  }

  /** Disconnetti dal database */
  async disconnect(): Promise<void> {
    if (this.mongooseInstance) {
      await mongoose.disconnect();
      this.mongooseInstance = null;
      logger.info("🛑 Disconnected from MongoDB via Mongoose");
    }
  }

  /** Restituisce l’istanza mongoose, throw se non connesso */
  getInstance(): Mongoose {
    if (!this.mongooseInstance) {
      throw new Error(
        "MongooseClient: Database not connected. Call connect() first."
      );
    }
    return this.mongooseInstance;
  }
}
