import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { playerService } from "../container";
import { PlayerSchema } from "./schema/bodies";

const registerPlayerRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["players"];

  // -------------------- GET /players/:id --------------------
  app.get(
    "/players/:id",
    { schema: { ...PlayerSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await playerService.findById(id);
      return { message: "Player retrieved successfully", data: item };
    }
  );

  // -------------------- GET /players --------------------
  app.get(
    "/players",
    { schema: { ...PlayerSchema.getAll, tags: tag } },
    async () => {
      const items = await playerService.findAll();
      return { message: "Player list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /players --------------------
  app.post(
    "/players",
    { schema: { ...PlayerSchema.post, tags: tag } },
    async (req) => {
      return playerService.create(req.body as any);
    }
  );

  app.patch(
    "/players/:id",
    { schema: { ...PlayerSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return playerService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /players/:id --------------------
  app.delete(
    "/players/:id",
    { schema: { ...PlayerSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await playerService.delete(id);
      return { message: "Player deleted successfully", data: true };
    }
  );
};

export default registerPlayerRoutes;
