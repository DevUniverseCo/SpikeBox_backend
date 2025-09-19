// plugins/swagger-ui.ts
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const register = fp(async (fastify: FastifyInstance) => {
  try {
    await fastify.register(swaggerUi, {
      routePrefix: "/docs",
    });

    fastify.after(() => {
      fastify.log.info("PLUGIN SWAGGER UI loaded successfully!");
    });
  } catch (err) {
    fastify.log.error({ err }, "Failed to load Swagger UI plugin");
    throw err;
  }
});
