import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app: FastifyInstance, opts) => {
  for (const [entity, config] of Object.entries(entities)) {
    app.delete(
      `/${entity}/:id`,
      {
        schema: config.schemas.delete,
      },
      async (request) => {
        const { id } = request.params as { id: string };
        const service = config.service(app);
        return await service.delete(id);
      }
    );
  }
};

export default route;
