import { Static, Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { PositionEnum } from "../../../../shared/common/enums/positionEum";

// -------------------- DTO base per CRUD --------------------
export const CreateHistoryDto = Type.Object({
  player: Type.String(),
  team: Type.String(),
  season: Type.String(),
  position: Type.Enum(PositionEnum),
  jerseyNumber: Type.Optional(Type.Number()),
  isCaptain: Type.Optional(Type.Boolean()),
});
export type CreateHistory = Static<typeof CreateHistoryDto>;

export const UpdateHistoryDto = Type.Partial(CreateHistoryDto);
export type UpdateHistory = Static<typeof UpdateHistoryDto>;

// DTO combinato per risposte, estende BaseSchema
export const HistoryDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateHistoryDto,
]);
export type History = Static<typeof HistoryDto>;

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(HistoryDto);
export const ResponseArrayDto = DataResponseArrayType(HistoryDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const HistorySchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateHistoryDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateHistoryDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
