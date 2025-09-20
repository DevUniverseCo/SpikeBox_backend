import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { achievementService } from "../container";
import { AchievementSchema } from "./schema/bodies";

const registerAchievementRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["achievements"];

  // -------------------- GET /achievements/:id --------------------
  app.get(
    "/achievements/:id",
    { schema: { ...AchievementSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await achievementService.findById(id);
      return { message: "Achievement retrieved successfully", data: item };
    }
  );

  // -------------------- GET /achievements --------------------
  app.get(
    "/achievements",
    { schema: { ...AchievementSchema.getAll, tags: tag } },
    async () => {
      const items = await achievementService.findAll();
      return {
        message: "Achievement list retrieved successfully",
        data: items,
      };
    }
  );

  // -------------------- POST /achievements --------------------
  app.post(
    "/achievements",
    { schema: { ...AchievementSchema.post, tags: tag } },
    async (req) => {
      return achievementService.create(req.body as any);
    }
  );

  // -------------------- PATCH /achievements/:id --------------------
  app.patch(
    "/achievements/:id",
    { schema: { ...AchievementSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return achievementService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /achievements/:id --------------------
  app.delete(
    "/achievements/:id",
    { schema: { ...AchievementSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await achievementService.delete(id);
      return { message: "Achievement deleted successfully", data: true };
    }
  );
};

export default registerAchievementRoutes;
