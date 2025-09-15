import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../../application/common/types/responseType";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app: FastifyInstance) => {
  for (const [entity, config] of Object.entries(entities)) {
    app.get(
      `/${entity}/:id`,
      {
        schema: config.schemas.get,
      },
      async (request): Promise<DataResponseSingleType<typeof config.type>> => {
        const { id } = request.params as { id: string };
        const service = config.service(app);
        const item = await service.findById(id);
        return {
          message: `${entity} retrieved successfully`,
          data: item as typeof config.type,
        };
      }
    );
    app.get(
      `/${entity}`,
      {
        schema: config.schemas.getAll,
      },
      async (): Promise<DataResponseArrayType<typeof config.type>> => {
        const service = config.service(app);
        const items = await service.findAll();
        return {
          message: `${entity} list retrieved successfully`,
          data: items,
        };
      }
    );
  }
};

export default route;
