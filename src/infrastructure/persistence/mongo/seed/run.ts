import dotenv from "dotenv";
import "dotenv/config"; // per leggere le variabili da .env
import { logger } from "../../../logger/logger";
import { MongooseClient } from "../mongooseClient";
import { seed } from "./seed";

dotenv.config({ path: ".env.dev" });

async function run() {
  const client = new MongooseClient({
    username: process.env.MONGODB_USERNAME!,
    password: process.env.MONGODB_PASSWORD!,
    cluster: process.env.MONGODB_CLUSTER!,
    dbName: process.env.MONGODB_DATABASE!,
  });

  try {
    await client.connect();
    await seed();
    logger.info("🌱 Database seeding completed successfully.");
  } catch (err) {
    logger.error("❌ Error during seeding:", err);
  } finally {
    await client.disconnect();
    process.exit(0);
  }
}

run();
