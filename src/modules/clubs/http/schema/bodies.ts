import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";

// --- DTO per sotto-oggetti (puoi dettagliare ulteriormente) ---
const ContactDto = Type.Object({}, { additionalProperties: true });
const LocationDto = Type.Object({}, { additionalProperties: true });
const PlatformDto = Type.Object({}, { additionalProperties: true });

// --- DTO base per CRUD ---
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

export const ClubDto = Type.Intersect([BaseSchema.Bodies.Base, CreateClubDto]);

// --- Response wrappers ---
export const ClubResponseSingleDto = DataResponseSingleType(ClubDto);
export const ClubResponseArrayDto = DataResponseArrayType(ClubDto);
