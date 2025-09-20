// -------------------- DTOs --------------------

import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { GenderEnum } from "../../../../shared/common/enums/genderEnum";
import { LeagueEnum } from "../../../../shared/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../shared/common/enums/levelEnum ";

// -------------------- DTO per sotto-oggetti --------------------
export const LocationDto = Type.Object({}, { additionalProperties: true });

// DTO per creazione Team
export const CreateTeamDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
  location: Type.Optional(LocationDto),
  season: Type.String(), // ObjectId come stringa
  club: Type.String(), // ObjectId come stringa
  staff: Type.Array(Type.String()), // array di ObjectId come stringhe
  level: Type.Enum(LevelEnum),
  gender: Type.Enum(GenderEnum),
  leagues: Type.Array(Type.Enum(LeagueEnum)),
});

// DTO per aggiornamento Team (PATCH)
export const UpdateTeamDto = Type.Partial(CreateTeamDto);

// DTO combinato per risposte, estende BaseSchema
export const TeamDto = Type.Intersect([BaseSchema.Bodies.Base, CreateTeamDto]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(TeamDto);
export const ResponseArrayDto = DataResponseArrayType(TeamDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const TeamSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateTeamDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateTeamDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
