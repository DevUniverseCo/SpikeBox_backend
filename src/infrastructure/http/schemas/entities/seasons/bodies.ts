import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../commons/bodies";

export const CreateSeason = Type.Object({
  clubId: Type.String(),
  name: Type.String(), // es: "2025/2026"
  seasonKey: Type.String(), // e.g., "2022-2023"
  startDate: Type.Optional(Type.String({ format: "date-time" })),
  endDate: Type.Optional(Type.String({ format: "date-time" })),
});

export const UpdateSeason = Type.Partial(CreateSeason);

export const SeedSeason = Type.Array(CreateSeason);
export const Season = Type.Intersect([BaseSchema.Bodies.Base, CreateSeason]);
export const SeasonArray = Type.Array(Season);

export const SeasonWithTeamsDto = Type.Intersect([Season]);

export const SeasonResponseSingle = DataResponseSingleType(Season);
export const SeasonResponseArray = DataResponseArrayType(Season);
