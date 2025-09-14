import { FastifyInstance } from "fastify";
import { Club } from "../../application/entities/clubs/model";
import { Experience } from "../../application/entities/experiences/model";
import { Player } from "../../application/entities/players/model";
import {
  ClubSchema,
  CommonSchema,
  ExperienceSchema,
  PlayerSchema,
} from "./schemas";

const ErrorResponses = {
  404: CommonSchema.Errors.ApiErrorResponse,
  500: CommonSchema.Errors.ApiErrorResponse,
};

export const entities = {
  players: {
    type: {} as Player,
    service: (app: FastifyInstance) => app.playerService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: PlayerSchema.Bodies.PlayerResponseSingle,
          ...ErrorResponses,
        },
      },
      getAll: {
        response: {
          200: PlayerSchema.Bodies.PlayerResponseArray,
          ...ErrorResponses,
        },
      },
      post: {
        body: PlayerSchema.Bodies.CreatePlayer,
        response: {
          201: PlayerSchema.Bodies.Player,
          ...ErrorResponses,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: PlayerSchema.Bodies.UpdatePlayer,
        response: {
          200: PlayerSchema.Bodies.Player,
          ...ErrorResponses,
        },
      },
      delete: {
        params: CommonSchema.Params.Id,
        response: {
          204: { type: "boolean" },
          ...ErrorResponses,
        },
      },
      getWithExperiences: {
        params: CommonSchema.Params.Id,
        response: {
          200: PlayerSchema.Bodies.PlayerWithExperiences,
          ...ErrorResponses,
        },
      },
    },
  },
  clubs: {
    type: {} as Club,
    service: (app: FastifyInstance) => app.clubService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: ClubSchema.Bodies.ClubResponseSingle,
          ...ErrorResponses,
        },
      },
      getAll: {
        response: {
          200: ClubSchema.Bodies.ClubResponseArray,
          ...ErrorResponses,
        },
      },
      post: {
        body: ClubSchema.Bodies.CreateClub,
        response: {
          201: ClubSchema.Bodies.Club,
          ...ErrorResponses,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: ClubSchema.Bodies.UpdateClub,
        response: {
          200: ClubSchema.Bodies.Club,
          ...ErrorResponses,
        },
      },
      delete: {
        params: CommonSchema.Params.Id,
        response: {
          204: { type: "boolean" },
          ...ErrorResponses,
        },
      },
    },
  },
  experiences: {
    type: {} as Experience,
    service: (app: FastifyInstance) => app.experienceService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: ExperienceSchema.Bodies.ExperienceResponseSingle,
          ...ErrorResponses,
        },
      },
      getAll: {
        response: {
          200: ExperienceSchema.Bodies.ExperienceResponseArray,
          ...ErrorResponses,
        },
      },
      post: {
        body: ExperienceSchema.Bodies.CreateExperience,
        response: {
          201: ExperienceSchema.Bodies.Experience,
          ...ErrorResponses,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: ExperienceSchema.Bodies.UpdateExperience,
        response: {
          200: ExperienceSchema.Bodies.Experience,
          ...ErrorResponses,
        },
      },
      delete: {
        params: CommonSchema.Params.Id,
        response: {
          204: { type: "boolean" },
          ...ErrorResponses,
        },
      },
    },
  },
};
