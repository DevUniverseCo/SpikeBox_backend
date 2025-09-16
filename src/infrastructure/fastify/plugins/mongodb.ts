import mongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb",
  });
};
