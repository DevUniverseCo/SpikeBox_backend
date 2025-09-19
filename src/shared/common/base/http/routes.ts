import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { entities } from "./factory";

const registerCrudRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  _.forOwn(entities, (config, entityName) => {
    const service = config.service(app);
    const tag = [entityName]; // Tag per Swagger UI

    // -------------------- GET /entity/:id --------------------
    if (config.schemas.get) {
      app.get(
        `/${entityName}/:id`,
        { schema: { ...config.schemas.get, tags: tag } },
        async (request) => {
          const { id } = request.params as { id: string };
          const item = await service.findById(id);
          return {
            message: `${entityName} retrieved successfully`,
            data: item,
          };
        }
      );
    }

    // -------------------- GET /entity --------------------
    if (config.schemas.getAll) {
      app.get(
        `/${entityName}`,
        { schema: { ...config.schemas.getAll, tags: tag } },
        async () => {
          const items = await service.findAll();
          return {
            message: `${entityName} list retrieved successfully`,
            data: items,
          };
        }
      );
    }

    // -------------------- POST /entity --------------------
    if (config.schemas.post) {
      app.post(
        `/${entityName}`,
        { schema: { ...config.schemas.post, tags: tag } },
        async (request) => {
          return service.create(request.body as any);
        }
      );
    }

    // -------------------- PATCH /entity/:id --------------------
    if (config.schemas.patch) {
      app.patch(
        `/${entityName}/:id`,
        { schema: { ...config.schemas.patch, tags: tag } },
        async (request) => {
          const { id } = request.params as { id: string };
          return service.update(id, request.body as any);
        }
      );
    }

    // -------------------- DELETE /entity/:id --------------------
    if (config.schemas.delete) {
      app.delete(
        `/${entityName}/:id`,
        { schema: { ...config.schemas.delete, tags: tag } },
        async (request) => {
          const { id } = request.params as { id: string };
          await service.delete(id);
          return { message: `${entityName} deleted successfully`, data: true };
        }
      );
    }
  });
};

export default registerCrudRoutes;
