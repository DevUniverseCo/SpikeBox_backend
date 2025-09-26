import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { playerHistoryService } from "../container";
import { PlayerHistorySchema } from "./schema/bodies";

const registerPlayerHistoryRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["player_histories"]; // nuovo tag per Swagger/OpenAPI

  // -------------------- GET /player_histories/:id --------------------
  app.get(
    "/player_histories/:id",
    { schema: { ...PlayerHistorySchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await playerHistoryService.findById(id);
      return { message: "Player history retrieved successfully", data: item };
    }
  );

  // -------------------- GET /player_histories --------------------
  app.get(
    "/player_histories",
    { schema: { ...PlayerHistorySchema.getAll, tags: tag } },
    async () => {
      const items = await playerHistoryService.findAll();
      return {
        message: "Player histories list retrieved successfully",
        data: items,
      };
    }
  );

  // -------------------- POST /player_histories --------------------
  app.post(
    "/player_histories",
    { schema: { ...PlayerHistorySchema.post, tags: tag } },
    async (req) => {
      return playerHistoryService.create(req.body as any);
    }
  );

  // -------------------- PATCH /player_histories/:id --------------------
  app.patch(
    "/player_histories/:id",
    { schema: { ...PlayerHistorySchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return playerHistoryService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /player_histories/:id --------------------
  app.delete(
    "/player_histories/:id",
    { schema: { ...PlayerHistorySchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await playerHistoryService.delete(id);
      return { message: "Player history deleted successfully", data: true };
    }
  );
};

export default registerPlayerHistoryRoutes;
