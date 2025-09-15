import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponseType } from "../../application/common/types/responseType";
import { logger } from "../utils/logger/logger";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: unknown, _request: FastifyRequest, reply: FastifyReply) => {
      const statusCode =
        typeof (error as any).statusCode === "number"
          ? (error as any).statusCode
          : 500;

      if (statusCode >= 500) {
        logger.error("Server error:", error);
      }

      const response: ErrorResponseType = {
        status: "error",
        statusCode,
        message:
          statusCode >= 500 ? "Internal Server Error" : (error as any).message,
      };

      reply.status(statusCode).send(response);
    }
  );
}
