import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { GenderEnum } from "../../../../shared/common/enums/genderEnum";
import { HandednessEnum } from "../../../../shared/common/enums/handednessEnum";

// --- DTO base per CRUD ---
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
  contact: Type.Optional(Type.Object({}, { additionalProperties: true })), // puoi dettagliare ContactType
  platform: Type.Optional(Type.Object({}, { additionalProperties: true })), // puoi dettagliare PlatformType
});

export const UpdatePlayerDto = Type.Partial(CreatePlayerDto);
export const PlayerDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreatePlayerDto,
]);

// --- Response wrappers ---
export const PlayerResponseSingleDto = DataResponseSingleType(PlayerDto);
export const PlayerResponseArrayDto = DataResponseArrayType(PlayerDto);
