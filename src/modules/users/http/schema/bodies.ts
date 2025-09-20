import { Type } from "@sinclair/typebox";

import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { RoleEnum } from "../../../../shared/common/enums/roleEnum";

// -------------------- DTOs --------------------

// DTO per creazione User
export const CreateUserDto = Type.Object({
  username: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  role: Type.Enum(RoleEnum),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
});

// DTO per aggiornamento User (PATCH)
export const UpdateUserDto = Type.Partial(CreateUserDto);

// DTO combinato per risposte, estende BaseSchema
export const UserDto = Type.Intersect([BaseSchema.Bodies.Base, CreateUserDto]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(UserDto);
export const ResponseArrayDto = DataResponseArrayType(UserDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const UserSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateUserDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateUserDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
