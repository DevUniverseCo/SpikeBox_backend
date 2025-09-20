import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { userService } from "../container";
import { UserSchema } from "./schema/bodies";

const registerUserRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["users"];

  // -------------------- GET /users/:id --------------------
  app.get(
    "/users/:id",
    { schema: { ...UserSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await userService.findById(id);
      return { message: "User retrieved successfully", data: item };
    }
  );

  // -------------------- GET /users --------------------
  app.get(
    "/users",
    { schema: { ...UserSchema.getAll, tags: tag } },
    async () => {
      const items = await userService.findAll();
      return { message: "User list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /users --------------------
  app.post(
    "/users",
    { schema: { ...UserSchema.post, tags: tag } },
    async (req) => {
      return userService.create(req.body as any);
    }
  );

  // -------------------- PATCH /users/:id --------------------
  app.patch(
    "/users/:id",
    { schema: { ...UserSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return userService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /users/:id --------------------
  app.delete(
    "/users/:id",
    { schema: { ...UserSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await userService.delete(id);
      return { message: "User deleted successfully", data: true };
    }
  );
};

export default registerUserRoutes;
