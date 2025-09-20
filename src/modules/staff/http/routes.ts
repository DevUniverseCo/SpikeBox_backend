import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { staffService } from "../container";
import { StaffSchema } from "./schema/bodies";

const registerStaffRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["staff"];

  // -------------------- GET /staff/:id --------------------
  app.get(
    "/staff/:id",
    { schema: { ...StaffSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await staffService.findById(id);
      return { message: "Staff retrieved successfully", data: item };
    }
  );

  // -------------------- GET /staff --------------------
  app.get(
    "/staff",
    { schema: { ...StaffSchema.getAll, tags: tag } },
    async () => {
      const items = await staffService.findAll();
      return { message: "Staff list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /staff --------------------
  app.post(
    "/staff",
    { schema: { ...StaffSchema.post, tags: tag } },
    async (req) => {
      return staffService.create(req.body as any);
    }
  );

  // -------------------- PATCH /staff/:id --------------------
  app.patch(
    "/staff/:id",
    { schema: { ...StaffSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return staffService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /staff/:id --------------------
  app.delete(
    "/staff/:id",
    { schema: { ...StaffSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await staffService.delete(id);
      return { message: "Staff deleted successfully", data: true };
    }
  );
};

export default registerStaffRoutes;
