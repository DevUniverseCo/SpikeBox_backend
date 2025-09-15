import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { DataResponseArray } from "../../../../../application/common/models";
import { Experience } from "../../../../../application/core/experiences/model";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/players/:id",
    {
      schema: entities.experiences.schemas.getByPlayerId,
    },
    async (request): Promise<DataResponseArray<Experience>> => {
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
