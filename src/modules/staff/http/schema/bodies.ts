import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { OfficeEnum } from "../../../../shared/common/enums/officeEnum";

// -------------------- DTOs --------------------

// DTO per creazione Staff
export const CreateStaffDto = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  birthDate: Type.Optional(Type.String({ format: "date-time" })),
  office: Type.Array(Type.Enum(OfficeEnum)),
  country: Type.Optional(Type.Enum(CountryEnum)),
  biography: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
});

// DTO per aggiornamento Staff (PATCH)
export const UpdateStaffDto = Type.Partial(CreateStaffDto);

// DTO combinato per risposte, estende BaseSchema
export const StaffDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateStaffDto,
]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(StaffDto);
export const ResponseArrayDto = DataResponseArrayType(StaffDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const StaffSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreateStaffDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdateStaffDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
