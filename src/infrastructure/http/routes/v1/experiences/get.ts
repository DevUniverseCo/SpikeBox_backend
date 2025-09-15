import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { DataResponseArrayType } from "../../../../../application/common/types/responseType";
import { History } from "../../../../../application/core/histories/model";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/players/:id",
    {
      schema: entities.experiences.schemas.getByPlayerId,
    },
    async (request): Promise<DataResponseArrayType<History>> => {
      const { id } = request.params as { id: string };
      const experiences = await app.experienceService.findByPlayerId(id);

      return {
        message: `Experiences for player ${id} retrieved successfully`,
        data: experiences,
      };
    }
  );
};

export default route;
