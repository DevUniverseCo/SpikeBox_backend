import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";
import { OfficeEnum } from "../../../../shared/common/enums/officeEnum";

// -------------------- DTOs --------------------

// DTO per creazione Staff
export const CreateStaffDto = Type.Object({
  staff: Type.String(),
  team: Type.String(),
  season: Type.String(),
  office: Type.Array(Type.Enum(OfficeEnum)),
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

export const StaffHistorySchema = {
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
