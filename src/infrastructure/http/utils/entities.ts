import { FastifyInstance } from "fastify";
import { CommonSchema, PlayerSchema } from "../schemas";

export const entities = {
  players: {
    service: (app: FastifyInstance) => app.playerService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: PlayerSchema.Bodies.Player,
          404: CommonSchema.Errors.NotFound,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      getAll: {
        response: {
          200: PlayerSchema.Bodies.Players,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      post: {
        body: PlayerSchema.Bodies.CreatePlayer,
        response: {
          201: PlayerSchema.Bodies.Player,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: PlayerSchema.Bodies.UpdatePlayer,
        response: {
          200: PlayerSchema.Bodies.Player,
          404: CommonSchema.Errors.NotFound,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      delete: {
        params: CommonSchema.Params.Id,
        response: {
          204: { type: "boolean" },
          404: CommonSchema.Errors.NotFound,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
    },
  },
};
