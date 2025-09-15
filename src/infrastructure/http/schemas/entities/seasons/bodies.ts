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
  startDate: Type.String({ format: "date-time" }),
  endDate: Type.String({ format: "date-time" }),
});

export const UpdateSeason = Type.Partial(CreateSeason);

export const Season = Type.Intersect([BaseSchema.Bodies.Base, CreateSeason]);

export const SeasonResponseSingle = DataResponseSingleType(Season);
export const SeasonResponseArray = DataResponseArrayType(Season);
