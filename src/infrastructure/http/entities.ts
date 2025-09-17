import { FastifyInstance } from "fastify";
import { Club } from "../../application/core/clubs/model";
import { Player } from "../../application/core/players/model";
import {
  ClubSchema,
  CommonSchema,
  HistorySchema,
  PlayerSchema,
} from "./schemas";

function createCrudSchemas<T>({
  typeSingle,
  typeArray,
  createBody,
  updateBody,
}: {
  typeSingle: any;
  typeArray: any;
  createBody: any;
  updateBody: any;
}) {
  const baseErrorResponses = {
    404: CommonSchema.Errors.ApiErrorResponse,
    500: CommonSchema.Errors.ApiErrorResponse,
  };

  return {
    get: {
      params: CommonSchema.Params.Id,
      response: { 200: typeSingle, ...baseErrorResponses },
    },
    getAll: { response: { 200: typeArray, ...baseErrorResponses } },
    post: {
      body: createBody,
      response: { 201: createBody, ...baseErrorResponses },
    },
    patch: {
      params: CommonSchema.Params.Id,
      body: updateBody,
      response: { 200: updateBody, ...baseErrorResponses },
    },
    delete: {
      params: CommonSchema.Params.Id,
      response: { 204: { type: "boolean" }, ...baseErrorResponses },
    },
  };
}

const ErrorResponses = {
  404: CommonSchema.Errors.ApiErrorResponse,
  500: CommonSchema.Errors.ApiErrorResponse,
};

export const entities = {
  players: {
    type: {} as Player,
    service: (app: FastifyInstance) => app.services.playerService,
    schemas: {
      ...createCrudSchemas({
        typeSingle: PlayerSchema.Bodies.PlayerResponseSingle,
        typeArray: PlayerSchema.Bodies.PlayerResponseArray,
        createBody: PlayerSchema.Bodies.CreatePlayer,
        updateBody: PlayerSchema.Bodies.UpdatePlayer,
      }),
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
    service: (app: FastifyInstance) => app.services.clubService,
    schemas: createCrudSchemas({
      typeSingle: ClubSchema.Bodies.ClubResponseSingle,
      typeArray: ClubSchema.Bodies.ClubResponseArray,
      createBody: ClubSchema.Bodies.CreateClub,
      updateBody: ClubSchema.Bodies.UpdateClub,
    }),
  },
  histories: {
    type: {} as History,
    service: (app: FastifyInstance) => app.services.historyService,
    schemas: {
      ...createCrudSchemas({
        typeSingle: HistorySchema.Bodies.HistoryResponseSingle,
        typeArray: HistorySchema.Bodies.HistoryResponseArray,
        createBody: HistorySchema.Bodies.CreateHistory,
        updateBody: HistorySchema.Bodies.UpdateHistory,
      }),
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
