import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { staffHistoryService } from "../container";
import { StaffHistorySchema } from "./schema/bodies";

const registerStaffHistoryRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["staff_histories"];

  // -------------------- GET /staff_histories/:id --------------------
  app.get(
    "/staff_histories/:id",
    { schema: { ...StaffHistorySchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await staffHistoryService.findById(id);
      return { message: "Staff history retrieved successfully", data: item };
    }
  );

  // -------------------- GET /staff_histories --------------------
  app.get(
    "/staff_histories",
    { schema: { ...StaffHistorySchema.getAll, tags: tag } },
    async () => {
      const items = await staffHistoryService.findAll();
      return {
        message: "Staff histories list retrieved successfully",
        data: items,
      };
    }
  );

  // -------------------- POST /staff_histories --------------------
  app.post(
    "/staff_histories",
    { schema: { ...StaffHistorySchema.post, tags: tag } },
    async (req) => {
      return staffHistoryService.create(req.body as any);
    }
  );

  // -------------------- PATCH /staff_histories/:id --------------------
  app.patch(
    "/staff_histories/:id",
    { schema: { ...StaffHistorySchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return staffHistoryService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /staff_histories/:id --------------------
  app.delete(
    "/staff_histories/:id",
    { schema: { ...StaffHistorySchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await staffHistoryService.delete(id);
      return { message: "Staff history deleted successfully", data: true };
    }
  );
};

export default registerStaffHistoryRoutes;
