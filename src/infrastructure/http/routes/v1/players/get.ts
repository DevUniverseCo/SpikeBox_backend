import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import { PlayerService } from "../../../../../application/players/playerService";
import { PlayerSchemas } from "../../../schemas";

interface RouteOptions {
  playerService: PlayerService;
}

const route: FastifyPluginAsyncTypebox<RouteOptions> = async (
  app: FastifyInstance,
  opts: RouteOptions
) => {
  const { playerService } = opts;

  app.get(
    "/:playerId",
    {
      schema: {
        params: PlayerSchemas.Params.PlayerId,
        response: {
          200: PlayerSchemas.Bodies.Player,
        },
      },
    },
    async (request, reply) => {
      const { playerId } = request.params as { playerId: ObjectId };
      const player = await playerService.getById(playerId);
      return reply.status(200).send(player);
    }
  );
};

export default route;
