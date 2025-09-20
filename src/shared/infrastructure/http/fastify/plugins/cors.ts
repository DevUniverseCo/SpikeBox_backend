import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const registerPluginCors = fp(async (fastify: FastifyInstance) => {
  try {
    await fastify.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });

    fastify.after(() => {
      fastify.log.info("PLUGIN CORS plugin loaded successfully!");
    });
  } catch (err) {
    fastify.log.error({ err }, "Failed to load CORS plugin");
    throw err;
  }
});
