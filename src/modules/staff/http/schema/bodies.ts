import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";
import { CountryEnum } from "../../../../shared/common/enums/countryEnum";
import { OfficeEnum } from "../../../../shared/common/enums/officeEnum";

// --- DTO base per CRUD ---
export const CreateStaffDto = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  birthDate: Type.Optional(Type.String({ format: "date-time" })), // ISO string
  office: Type.Array(Type.Enum(OfficeEnum)),
  country: Type.Optional(Type.Enum(CountryEnum)),
  biography: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
});

export const UpdateStaffDto = Type.Partial(CreateStaffDto);

export const StaffDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateStaffDto,
]);

// --- Response wrappers ---
export const StaffResponseSingleDto = DataResponseSingleType(StaffDto);
export const StaffResponseArrayDto = DataResponseArrayType(StaffDto);
