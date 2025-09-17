import { FastifyInstance } from "fastify";
import { Club } from "../../application/core/clubs/model";
import { Player } from "../../application/core/players/model";
import { Season } from "../../application/core/seasons/model";
import { Team } from "../../application/core/teams/model";
import {
  ClubSchema,
  CommonSchema,
  HistorySchema,
  PlayerSchema,
  SeasonSchema,
  TeamSchema,
} from "./schemas";

function createCrudSchemas<T>({
  typeSingle,
  typeArray,
  createBody,
  updateBody,
  createManyBody,
}: {
  typeSingle: any;
  typeArray: any;
  createBody: any;
  updateBody: any;
  createManyBody: any;
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
    seed: {
      body: createManyBody,
      response: { 201: typeArray, ...baseErrorResponses },
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
        createManyBody: PlayerSchema.Bodies.SeedPlayer,
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
  teams: {
    type: {} as Team,
    service: (app: FastifyInstance) => app.services.teamService,
    schemas: {
      ...createCrudSchemas({
        typeSingle: TeamSchema.Bodies.TeamResponseSingle,
        typeArray: TeamSchema.Bodies.TeamResponseArray,
        createBody: TeamSchema.Bodies.CreateTeam,
        updateBody: TeamSchema.Bodies.UpdateTeam,
        createManyBody: TeamSchema.Bodies.SeedTeam,
      }),
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
      createManyBody: ClubSchema.Bodies.SeedClub,
    }),
  },
  seasons: {
    type: {} as Season,
    service: (app: FastifyInstance) => app.services.seasonService,
    schemas: createCrudSchemas({
      typeSingle: SeasonSchema.Bodies.SeasonResponseSingle,
      typeArray: SeasonSchema.Bodies.SeasonResponseArray,
      createBody: SeasonSchema.Bodies.CreateSeason,
      updateBody: SeasonSchema.Bodies.UpdateSeason,
      createManyBody: SeasonSchema.Bodies.SeedSeason,
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
        createManyBody: HistorySchema.Bodies.SeedHistory,
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
