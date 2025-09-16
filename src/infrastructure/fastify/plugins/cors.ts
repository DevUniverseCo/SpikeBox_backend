import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const corsPlugin = async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
};

// Avvolgi con fastify-plugin e esporta come default
export default fp(corsPlugin);

// TO DO SISTEMARE L'EXPORT
