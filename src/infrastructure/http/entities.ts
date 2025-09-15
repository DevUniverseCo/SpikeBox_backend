import { FastifyInstance } from "fastify";
import { Club } from "../../application/core/clubs/model";
import { History } from "../../application/core/histories/model";
import { Player } from "../../application/core/players/model";
import {
  ClubSchema,
  CommonSchema,
  HistorySchema,
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
  histories: {
    type: {} as History,
    service: (app: FastifyInstance) => app.historyService,
    schemas: {
      get: {
        params: CommonSchema.Params.Id,
        response: {
          200: HistorySchema.Bodies.HistoryResponseSingle,
          ...ErrorResponses,
        },
      },
      getAll: {
        response: {
          200: HistorySchema.Bodies.HistoryResponseArray,
          ...ErrorResponses,
        },
      },
      post: {
        body: HistorySchema.Bodies.CreateHistory,
        response: {
          201: HistorySchema.Bodies.History,
          ...ErrorResponses,
        },
      },
      patch: {
        params: CommonSchema.Params.Id,
        body: HistorySchema.Bodies.UpdateHistory,
        response: {
          200: HistorySchema.Bodies.History,
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
      getByPlayerId: {
        params: CommonSchema.Params.Id,
        response: {
          200: HistorySchema.Bodies.HistoryResponseArray,
          ...ErrorResponses,
        },
      },
    },
  },
};
