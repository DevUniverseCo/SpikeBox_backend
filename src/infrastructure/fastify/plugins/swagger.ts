import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(swagger, {
    swagger: {
      info: { title: "API Fastify", description: "API docs", version: "1.0.0" },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await fastify.register(swaggerUi, { routePrefix: "/docs" });
};
