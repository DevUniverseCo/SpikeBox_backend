import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { entities } from "../../entities";

const registerCrudRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  for (const [entityName, config] of Object.entries(entities)) {
    const service = config.service(app);

    // GET /entity/:id
    if (config.schemas.get) {
      app.get(
        `/${entityName}/:id`,
        { schema: config.schemas.get },
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

    // GET /entity
    if (config.schemas.getAll) {
      app.get(`/${entityName}`, { schema: config.schemas.getAll }, async () => {
        const items = await service.findAll();
        return {
          message: `${entityName} list retrieved successfully`,
          data: items,
        };
      });
    }

    // POST /entity
    if (config.schemas.post) {
      app.post(
        `/${entityName}`,
        { schema: config.schemas.post },
        async (request) => service.create(request.body as any)
      );
    }

    // POST /entity/seed
    if (config.schemas.seed) {
      app.post(
        `/${entityName}/seed`,
        { schema: config.schemas.seed },
        async (request) => service.createMany(request.body as any)
      );
    }

    // PATCH /entity/:id
    if (config.schemas.patch) {
      app.patch(
        `/${entityName}/:id`,
        { schema: config.schemas.patch },
        async (request) => {
          const { id } = request.params as { id: string };
          return service.update(id, request.body as any);
        }
      );
    }

    // DELETE /entity/:id
    if (config.schemas.delete) {
      app.delete(
        `/${entityName}/:id`,
        { schema: config.schemas.delete },
        async (request) => {
          const { id } = request.params as { id: string };
          await service.delete(id);
          return { message: `${entityName} deleted successfully`, data: true };
        }
      );
    }

    // // eventuali route custom
    // for (const [customName, customSchema] of Object.entries(config.schemas)) {
    //   if (!["get", "getAll", "post", "patch", "delete"].includes(customName)) {
    //     app.get(
    //       `/${entityName}/${customName}/:id`,
    //       { schema: customSchema },
    //       async (request) => {
    //         const { id } = request.params as { id: string };
    //         return service[customName](id);
    //       }
    //     );
    //   }
    // }
  }
};

export default registerCrudRoutes;
