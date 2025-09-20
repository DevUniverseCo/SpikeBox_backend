import { Type } from "@sinclair/typebox";

import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";

// -------------------- DTOs --------------------

// DTO per creazione Season
export const CreateSeasonDto = Type.Object({
  name: Type.String(), // es: "2025/2026"
  description: Type.Optional(Type.String()),
  season: Type.String(), // es: "2022-2023"
});

// DTO per aggiornamento Season (PATCH)
export const UpdateSeasonDto = Type.Partial(CreateSeasonDto);

// DTO combinato per risposte, estende BaseSchema
export const SeasonDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateSeasonDto,
]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(SeasonDto);
export const ResponseArrayDto = DataResponseArrayType(SeasonDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const SeasonSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateSeasonDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateSeasonDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
