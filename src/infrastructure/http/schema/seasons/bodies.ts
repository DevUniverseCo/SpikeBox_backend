import { Type } from "@sinclair/typebox";
import { BaseSchema } from "..";
import { DataResponseArrayType, DataResponseSingleType } from "../base/bodies";

// --- DTO base per CRUD ---
export const CreateSeasonDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  season: Type.String(),
});

export const UpdateSeasonDto = Type.Partial(CreateSeasonDto);
export const SeasonDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateSeasonDto,
]);

// --- Response wrappers ---
export const SeasonResponseSingleDto = DataResponseSingleType(SeasonDto);
export const SeasonResponseArrayDto = DataResponseArrayType(SeasonDto);
