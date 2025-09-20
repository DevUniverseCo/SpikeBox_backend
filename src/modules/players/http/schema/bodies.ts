import { Static, Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { GenderEnum } from "../../../../shared/common/enums/genderEnum";
import { HandednessEnum } from "../../../../shared/common/enums/handednessEnum";

// -------------------- DTOs --------------------

// DTO per la creazione di un Player
export const CreatePlayerDto = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  birthDate: Type.Optional(Type.String({ format: "date-time" })), // ISO string
  gender: Type.Optional(Type.Enum(GenderEnum)),
  heightCm: Type.Optional(Type.Number()),
  weightKg: Type.Optional(Type.Number()),
  handedness: Type.Optional(Type.Enum(HandednessEnum)),
  country: Type.Optional(Type.Enum(CountryEnum)),
  biography: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
  contact: Type.Optional(Type.Object({}, { additionalProperties: true })), // dettagliabili
  platform: Type.Optional(Type.Object({}, { additionalProperties: true })), // dettagliabili
});

export type CreatePlayer = Static<typeof CreatePlayerDto>;

// DTO per aggiornamento
export const UpdatePlayerDto = Type.Partial(CreatePlayerDto);
export type UpdatePlayer = Static<typeof UpdatePlayerDto>;

// DTO combinato per risposte, estende BaseSchema se necessario
export const PlayerDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreatePlayerDto,
]);
export type Player = Static<typeof PlayerDto>;

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(PlayerDto);
export const ResponseArrayDto = DataResponseArrayType(PlayerDto);

// -------------------- Schema CRUD per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const PlayerSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreatePlayerDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdatePlayerDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
