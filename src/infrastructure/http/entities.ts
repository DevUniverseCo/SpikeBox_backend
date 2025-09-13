import { FastifyInstance } from "fastify";
import {
  ClubSchema,
  CommonSchema,
  ExperienceSchema,
  PlayerSchema,
} from "./schemas";

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
  clubs: {
    service: (app: FastifyInstance) => app.clubService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: ClubSchema.Bodies.Club,
          404: CommonSchema.Errors.NotFound,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      getAll: {
        response: {
          200: ClubSchema.Bodies.Clubs,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      post: {
        body: ClubSchema.Bodies.CreateClub,
        response: {
          201: ClubSchema.Bodies.Club,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: ClubSchema.Bodies.UpdateClub,
        response: {
          200: ClubSchema.Bodies.Club,
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
  experiences: {
    service: (app: FastifyInstance) => app.experienceService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: ExperienceSchema.Bodies.Experience,
          404: CommonSchema.Errors.NotFound,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      getAll: {
        response: {
          200: ExperienceSchema.Bodies.Experiences,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      post: {
        body: ExperienceSchema.Bodies.CreateExperience,
        response: {
          201: ExperienceSchema.Bodies.Experience,
          500: CommonSchema.Errors.InternalServerError,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: ExperienceSchema.Bodies.UpdateExperience,
        response: {
          200: ExperienceSchema.Bodies.Experience,
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
