import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { DataResponseArrayType } from "../../../../../application/common/types/responseType";
import { History } from "../../../../../application/core/histories/model";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/players/:id",
    {
      schema: entities.histories.schemas.getByPlayerId,
    },
    async (request): Promise<DataResponseArrayType<History>> => {
      const { id } = request.params as { id: string };
      const histories = await app.historyService.findByPlayerId(id);

      return {
        message: `Histories for player ${id} retrieved successfully`,
        data: histories,
      };
    }
  );
};

export default route;
