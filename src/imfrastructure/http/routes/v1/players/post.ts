import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { CreatePlayer } from "../../../../../application/players/model";
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

  app.post(
    "/",
    {
      schema: {
        body: PlayerSchemas.Bodies.CreatePlayer,
        response: {
          201: PlayerSchemas.Bodies.Player,
        },
      },
    },
    async (request, reply) => {
      const player = request.body as CreatePlayer;
      const newPlayer = await playerService.create(player);
      return reply.status(201).send(newPlayer);
    }
  );
};

export default route;
