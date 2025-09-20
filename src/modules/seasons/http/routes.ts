import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { seasonService } from "../container";
import { SeasonSchema } from "./schema/bodies";

const registerSeasonRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["seasons"];

  // -------------------- GET /seasons/:id --------------------
  app.get(
    "/seasons/:id",
    { schema: { ...SeasonSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await seasonService.findById(id);
      return { message: "Season retrieved successfully", data: item };
    }
  );

  // -------------------- GET /seasons --------------------
  app.get(
    "/seasons",
    { schema: { ...SeasonSchema.getAll, tags: tag } },
    async () => {
      const items = await seasonService.findAll();
      return { message: "Season list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /seasons --------------------
  app.post(
    "/seasons",
    { schema: { ...SeasonSchema.post, tags: tag } },
    async (req) => {
      return seasonService.create(req.body as any);
    }
  );

  // -------------------- PATCH /seasons/:id --------------------
  app.patch(
    "/seasons/:id",
    { schema: { ...SeasonSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return seasonService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /seasons/:id --------------------
  app.delete(
    "/seasons/:id",
    { schema: { ...SeasonSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await seasonService.delete(id);
      return { message: "Season deleted successfully", data: true };
    }
  );
};

export default registerSeasonRoutes;
