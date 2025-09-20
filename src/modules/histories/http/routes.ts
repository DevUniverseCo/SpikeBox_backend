import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { historyService } from "../container";
import { HistorySchema } from "./schema/bodies";

const registerHistoryRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["histories"];

  // -------------------- GET /histories/:id --------------------
  app.get(
    "/histories/:id",
    { schema: { ...HistorySchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await historyService.findById(id);
      return { message: "History retrieved successfully", data: item };
    }
  );

  // -------------------- GET /histories --------------------
  app.get(
    "/histories",
    { schema: { ...HistorySchema.getAll, tags: tag } },
    async () => {
      const items = await historyService.findAll();
      return { message: "History list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /histories --------------------
  app.post(
    "/histories",
    { schema: { ...HistorySchema.post, tags: tag } },
    async (req) => {
      return historyService.create(req.body as any);
    }
  );

  // -------------------- PATCH /histories/:id --------------------
  app.patch(
    "/histories/:id",
    { schema: { ...HistorySchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return historyService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /histories/:id --------------------
  app.delete(
    "/histories/:id",
    { schema: { ...HistorySchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await historyService.delete(id);
      return { message: "History deleted successfully", data: true };
    }
  );
};

export default registerHistoryRoutes;
