import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { entities } from "../../entities";

const registerSeasonRoutes: FastifyPluginAsyncTypebox = async (
  app: FastifyInstance
) => {
  const service = entities.seasons.service(app);

  // GET /entity
  if (entities.seasons.schemas.getAll) {
    app.get(
      `/seasons/all/club/:id`,
      { schema: entities.seasons.schemas.getAll },
      async (request) => {
        const { id } = request.params as { id: string };
        const items = await service.findAllWithTeamsFilteredClubId(id);
        return {
          message: `Seasons list retrieved successfully`,
          data: items,
        };
      }
    );
  }
};

export default registerSeasonRoutes;
