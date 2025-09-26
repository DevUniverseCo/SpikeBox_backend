import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import S from "fluent-json-schema";

export const registerPluginEnv = fp(async (fastify: FastifyInstance) => {
  try {
    // Schema delle variabili d'ambiente
    const schema = S.object()
      .prop("NODE_ENV", S.string().enum(["dev", "prod"]).required())
      .prop("PORT", S.number().default(3000))

      // MongoDB
      .prop("MONGODB_USERNAME", S.string().required())
      .prop("MONGODB_PASSWORD", S.string().required())
      .prop("MONGODB_DATABASE", S.string().required())
      .prop("MONGODB_CLUSTER", S.string().required())

      // PostgreSQL
      .prop("PG_USERNAME", S.string().required())
      .prop("PG_PASSWORD", S.string().required())
      .prop("PG_DATABASE", S.string().required())
      .prop("PG_HOST", S.string().default("localhost"))
      .prop("PG_PORT", S.number().default(5432))
      .valueOf();

    const options: FastifyEnvOptions = {
      confKey: "config",
      schema,
      dotenv: {
        path: `.env.${process.env.NODE_ENV || "dev"}`, // carica .env.dev quando NODE_ENV=dev
      },
      data: process.env,
    };

    await fastify.register(fastifyEnv, options);

    fastify.after(() => {
      fastify.log.info("PLUGIN ENV variables loaded successfully!");
    });
  } catch (err) {
    fastify.log.error({ err }, "Failed to load environment variables");
    throw err;
  }
});
