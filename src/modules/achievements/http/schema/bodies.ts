import { Type } from "@sinclair/typebox";

import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { EntityEnum } from "../../../../shared/common/enums/entityEnum";

// -------------------- DTOs --------------------

// DTO per creazione Achievement
export const CreateAchievementDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  date: Type.String({ format: "date-time" }),
  entity: Type.Enum(EntityEnum),
  season: Type.String(),
  player: Type.String(),
  team: Type.String(),
});

// DTO per aggiornamento Achievement (PATCH)
export const UpdateAchievementDto = Type.Partial(CreateAchievementDto);

// DTO combinato per risposte, estende BaseSchema
export const AchievementDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateAchievementDto,
]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(AchievementDto);
export const ResponseArrayDto = DataResponseArrayType(AchievementDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const AchievementSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateAchievementDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateAchievementDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
