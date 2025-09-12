import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PostSchemas } from "../../../schemas/index";
import { decodeSort } from "../../../utils/decodeSort";

const route: FastifyPluginAsyncTypebox = async (app) => {
  // GET /:playerId
  app.get(
    "/:playerId",
    {
      schema: {
        params: PostSchemas.Params.PostId,
        response: {
          200: PostSchemas.Bodies.Post,
        },
      },
    },
    async (
      request: import("fastify").FastifyRequest<{
        Params: typeof PostSchemas.Params.PostId;
      }>
    ) => {
      const { playerId } = request.params;
      const player = await app.playersService.findById(playerId);
      return player;
    }
  );

  // GET /
  app.get(
    "/",
    {
      schema: {
        querystring: PostSchemas.Queries.PostsQuery,
        response: {
          200: PostSchemas.Bodies.PostsPaginated,
        },
      },
    },
    async (request) => {
      const { offset = 0, limit = 10, sort } = request.query;

      // decodeSort potrebbe restituire un oggetto per Mongo o SQL
      const sortOptions = sort ? decodeSort(sort) : undefined;

      const posts = await app.postsService.findAll(
        { offset, limit },
        sortOptions
      );

      return posts;
    }
  );
};

export default route;
