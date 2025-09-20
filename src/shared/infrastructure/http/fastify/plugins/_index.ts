import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { registerPluginCors } from "./cors";
import { registerPluginEnv } from "./env";
import { registerPluginErrors } from "./errors";
import { registerPluginHelmet } from "./helmet";
import { registerPluginSwaggerCore } from "./swagger";
import { registerPluginSwaggerUi } from "./swagger-ui";

async function registerAllPlugins(fastify: FastifyInstance) {
  await fastify.register(registerPluginEnv);
  await fastify.register(registerPluginCors);
  await fastify.register(registerPluginErrors);
  await fastify.register(registerPluginHelmet);
  await fastify.register(registerPluginSwaggerCore);
  await fastify.register(registerPluginSwaggerUi);
}

export default fp(registerAllPlugins, { name: "registerAllPlugins" });
