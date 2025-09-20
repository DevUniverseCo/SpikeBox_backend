import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { teamService } from "../container";
import { TeamSchema } from "./schema/bodies";

const registerTeamRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["teams"];

  // -------------------- GET /teams/:id --------------------
  app.get(
    "/teams/:id",
    { schema: { ...TeamSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await teamService.findById(id);
      return { message: "Team retrieved successfully", data: item };
    }
  );

  // -------------------- GET /teams --------------------
  app.get(
    "/teams",
    { schema: { ...TeamSchema.getAll, tags: tag } },
    async () => {
      const items = await teamService.findAll();
      return { message: "Team list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /teams --------------------
  app.post(
    "/teams",
    { schema: { ...TeamSchema.post, tags: tag } },
    async (req) => {
      return teamService.create(req.body as any);
    }
  );

  // -------------------- PATCH /teams/:id --------------------
  app.patch(
    "/teams/:id",
    { schema: { ...TeamSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return teamService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /teams/:id --------------------
  app.delete(
    "/teams/:id",
    { schema: { ...TeamSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await teamService.delete(id);
      return { message: "Team deleted successfully", data: true };
    }
  );
};

export default registerTeamRoutes;
