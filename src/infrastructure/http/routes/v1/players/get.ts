import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ObjectId } from "mongodb";
import { entities } from "../../../entities";

const route: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/:id/experiences",
    {
      schema: entities.players.schemas.getWithExperiences,
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const objectId = new ObjectId(id);

      const player = await app.playerService.findByIdWithExperiences(objectId);

      if (!player) {
        return undefined;
      }

      // Converti ObjectId e Date in stringhe
      const playerWithStringId = {
        ...player,
        _id: player._id?.toString(),
        createdAt: player.createdAt.toISOString(),
        updatedAt: player.updatedAt.toISOString(),
        experiences: player.experiences.map((exp) => ({
          ...exp,
          _id: exp._id?.toString(),
          playerId: exp.playerId.toString(),
          clubId: exp.clubId?.toString(),
          createdAt: exp.createdAt.toISOString(),
          updatedAt: exp.updatedAt.toISOString(),
        })),
      };

      return playerWithStringId;
    }
  );
};

export default route;
