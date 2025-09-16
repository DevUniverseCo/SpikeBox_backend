import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

export const register = async (fastify: FastifyInstance) => {
  // Schema delle variabili d'ambiente
  const schema = S.object()
    .prop("NODE_ENV", S.string().enum(["dev", "prod"]).required())
    .prop("PORT", S.number().default(3000))
    .prop("MONGODB_USERNAME", S.string().required())
    .prop("MONGODB_PASSWORD", S.string().required())
    .prop("MONGODB_DATABASE", S.string().required())
    .prop("MONGODB_CLUSTER", S.string().required())
    .valueOf();

  const options: FastifyEnvOptions = {
    confKey: "config",
    schema,
    dotenv: false,
    data: process.env,
  };

  await fastify.register(fastifyEnv, options);

  fastify.after(() => {
    fastify.log.info("✅ Environment variables loaded successfully");
  });
};
