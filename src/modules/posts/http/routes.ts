import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { postService } from "../container";
import { PostSchema } from "./schema/bodies";

const registerPostRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const tag = ["posts"];

  // -------------------- GET /posts/:id --------------------
  app.get(
    "/posts/:id",
    { schema: { ...PostSchema.get, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      const item = await postService.findById(id);
      return { message: "Post retrieved successfully", data: item };
    }
  );

  // -------------------- GET /posts --------------------
  app.get(
    "/posts",
    { schema: { ...PostSchema.getAll, tags: tag } },
    async () => {
      const items = await postService.findAll();
      return { message: "Post list retrieved successfully", data: items };
    }
  );

  // -------------------- POST /posts --------------------
  app.post(
    "/posts",
    { schema: { ...PostSchema.post, tags: tag } },
    async (req) => {
      return postService.create(req.body as any);
    }
  );

  // -------------------- PATCH /posts/:id --------------------
  app.patch(
    "/posts/:id",
    { schema: { ...PostSchema.patch, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      return postService.update(id, req.body as any);
    }
  );

  // -------------------- DELETE /posts/:id --------------------
  app.delete(
    "/posts/:id",
    { schema: { ...PostSchema.delete, tags: tag } },
    async (req) => {
      const { id } = req.params as { id: string };
      await postService.delete(id);
      return { message: "Post deleted successfully", data: true };
    }
  );
};

export default registerPostRoutes;
