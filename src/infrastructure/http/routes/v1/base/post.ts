import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance, FastifyRequest } from "fastify";
import { entities } from "../../../utils/entities";

const route: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
  for (const [entity, config] of Object.entries(entities)) {
    app.post(
      `/${entity}`,
      {
        schema: config.schemas.post,
      },
      async (request: FastifyRequest) => {
        const service = config.service(app);
        return await service.create(request.body as any);
      }
    );
  }
};

export default route;
