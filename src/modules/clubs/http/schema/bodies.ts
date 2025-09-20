import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";

// -------------------- DTO per sotto-oggetti --------------------
export const ContactDto = Type.Object({}, { additionalProperties: true });
export const LocationDto = Type.Object({}, { additionalProperties: true });
export const PlatformDto = Type.Object({}, { additionalProperties: true });

// -------------------- DTO base per CRUD --------------------
export const CreateClubDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  foundationYear: Type.Optional(Type.Number()),
  logoUrl: Type.Optional(Type.String({ format: "uri" })),
  contact: Type.Optional(ContactDto),
  location: Type.Optional(LocationDto),
  platform: Type.Optional(PlatformDto),
});

export const UpdateClubDto = Type.Partial(CreateClubDto);

// DTO combinato per risposte, estende BaseSchema
export const ClubDto = Type.Intersect([BaseSchema.Bodies.Base, CreateClubDto]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(ClubDto);
export const ResponseArrayDto = DataResponseArrayType(ClubDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const ClubSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateClubDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateClubDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
