import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { ErrorResponseType } from "../../../application/common/types/responseType";
import { logger } from "../../logger/logger";

/**
 * Custom error handler plugin per Fastify
 * Intercetta tutti gli errori e invia una risposta JSON strutturata.
 */
export const register = fp(async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(
    (error: unknown, _request: FastifyRequest, reply: FastifyReply) => {
      const statusCode =
        typeof (error as any).statusCode === "number"
          ? (error as any).statusCode
          : 500;

      if (statusCode >= 500) logger.error("Server error:", error);

      const response: ErrorResponseType = {
        status: "error",
        statusCode,
        message:
          statusCode >= 500 ? "Internal Server Error" : (error as any).message,
      };

      reply.status(statusCode).send(response);
    }
  );
});
