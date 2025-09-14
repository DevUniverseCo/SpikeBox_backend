import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
  for (const [entity, config] of Object.entries(entities)) {
    app.patch(
      `/${entity}/:id`,
      {
        schema: config.schemas.patch,
      },
      async (request) => {
        const { id } = request.params as { id: string };
        const service = config.service(app);
        return await service.update(id, request.body as any);
      }
    );
  }
};

export default route;
