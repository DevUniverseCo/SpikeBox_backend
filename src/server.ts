import { Application } from "./app";
import { logger } from "./shared/utils/logger";

async function startServer() {
  const app = new Application();
  const fastifyApp = await app.bootstrap();
  await fastifyApp.start();
}

startServer().catch((err) => logger.error("❌ Failed to start server:", err));
