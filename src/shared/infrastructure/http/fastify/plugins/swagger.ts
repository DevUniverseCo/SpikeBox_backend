// plugins/swagger-core.ts
import swagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const registerPluginSwaggerCore = fp(
  async (fastify: FastifyInstance) => {
    try {
      await fastify.register(swagger, {
        swagger: {
          info: {
            title: "API Fastify",
            description: "API docs",
            version: "1.0.0",
          },
          host: "localhost:3000",
          schemes: ["http"],
          consumes: ["application/json"],
          produces: ["application/json"],
        },
      });

      fastify.after(() => {
        fastify.log.info("PLUGIN SWAGGER Core loaded successfully!");
      });
    } catch (err) {
      fastify.log.error({ err }, "Failed to load Swagger Core plugin");
      throw err;
    }
  }
);
