import { FastifyInstance } from "fastify";
import { Season } from "../../application/domain/season";
import { CommonSchema, SeasonSchema } from "./schema";

// ----------------- Costanti comuni -----------------
const ErrorResponses = {
  404: CommonSchema.Errors.ApiErrorResponse,
  500: CommonSchema.Errors.ApiErrorResponse,
};

// ----------------- Utility per CRUD -----------------
function createCrudSchemas({
  typeSingle,
  typeArray,
  createBody,
  updateBody,
  createManyBody,
}: {
  typeSingle: object;
  typeArray: object;
  createBody: object;
  updateBody: object;
  createManyBody: object;
}) {
  return {
    get: {
      params: CommonSchema.Params.Id,
      response: { 200: typeSingle, ...ErrorResponses },
    },
    getAll: {
      response: { 200: typeArray, ...ErrorResponses },
    },
    post: {
      body: createBody,
      response: { 201: createBody, ...ErrorResponses },
    },
    patch: {
      params: CommonSchema.Params.Id,
      body: updateBody,
      response: { 200: updateBody, ...ErrorResponses },
    },
    delete: {
      params: CommonSchema.Params.Id,
      response: { 204: { type: "boolean" }, ...ErrorResponses },
    },
    seed: {
      body: createManyBody,
      response: { 201: typeArray, ...ErrorResponses },
    },
  };
}

// ----------------- Entities -----------------
export const entities = {
  // Esempio: seasons
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
    custom: {
      getByClubIdWithTeams: {
        params: CommonSchema.Params.Id,
        response: {
          200: SeasonSchema.Bodies.SeasonWithTeamsDto,
          ...ErrorResponses,
        },
      },
    },
  },

  // altri entities commentati per ora:
  /*
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
  */
};
