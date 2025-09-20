import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { clubService } from "../container";
import { ClubSchema } from "./schema/bodies";

const registerClubRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["clubs"];

  // -------------------- GET /clubs/:id --------------------
  app.get(
    "/clubs/:id",
    { schema: { ...ClubSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await clubService.findById(id);
      return { message: "Club retrieved successfully", data: item };
    }
  );

  // -------------------- GET /clubs --------------------
  app.get(
    "/clubs",
    { schema: { ...ClubSchema.getAll, tags: tag } },
    async () => {
      const items = await clubService.findAll();
      return { message: "Club list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /clubs --------------------
  app.post(
    "/clubs",
    { schema: { ...ClubSchema.post, tags: tag } },
    async (req) => {
      return clubService.create(req.body as any);
    }
  );

  // -------------------- PATCH /clubs/:id --------------------
  app.patch(
    "/clubs/:id",
    { schema: { ...ClubSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return clubService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /clubs/:id --------------------
  app.delete(
    "/clubs/:id",
    { schema: { ...ClubSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await clubService.delete(id);
      return { message: "Club deleted successfully", data: true };
    }
  );
};

export default registerClubRoutes;
