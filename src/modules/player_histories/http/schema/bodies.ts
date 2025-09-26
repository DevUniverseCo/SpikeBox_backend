import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { PositionEnum } from "../../../../shared/common/enums/positionEum";

// -------------------- DTO base per CRUD --------------------
export const CreatePlayerHistoryDto = Type.Object({
  player: Type.String(),
  team: Type.String(),
  season: Type.String(),
  position: Type.Enum(PositionEnum),
  jerseyNumber: Type.Optional(Type.Number()),
  isCaptain: Type.Optional(Type.Boolean()),
});

// DTO per aggiornamento
export const UpdatePlayerHistoryDto = Type.Partial(CreatePlayerHistoryDto);

// DTO combinato per risposte, estende BaseSchema
export const PlayerHistoryDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreatePlayerHistoryDto,
]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(PlayerHistoryDto);
export const ResponseArrayDto = DataResponseArrayType(PlayerHistoryDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const PlayerHistorySchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreatePlayerHistoryDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdatePlayerHistoryDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
