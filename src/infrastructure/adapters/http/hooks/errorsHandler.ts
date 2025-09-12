import { FastifyInstance, FastifyReply } from "fastify";
import { logger } from "../../../../shared/utils/logger";
import { ApiResponse } from "../../../dtos/apiResponse";

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: unknown, _request, reply: FastifyReply) => {
    // App-level errors (expected)
    const appErr = error as Partial<AppError & { status?: number }>;
    const status = appErr.status || appErr.statusCode || 500;
    const message = appErr.message || "Unexpected error";

    // Log server errors
    if (status >= 500) {
      logger.error("Unhandled error", { error });
    } else {
      logger.warn("Handled error", { message, status });
    }

    const payload: ApiResponse<unknown> = {
      code: status,
      message,
      data: status >= 500 ? null : [],
      success: status < 400,
    };

    reply.status(status).send(payload);
  });
}
