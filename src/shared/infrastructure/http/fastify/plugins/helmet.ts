import helmet from "@fastify/helmet";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const registerPluginHelmet = fp(async (fastify: FastifyInstance) => {
  try {
    await fastify.register(helmet);

    fastify.after(() => {
      fastify.log.info("PLUGIN HELMET loaded successfully!");
    });
  } catch (err) {
    fastify.log.error({ err }, "Failed to load Helmet plugin");
    throw err;
  }
});
