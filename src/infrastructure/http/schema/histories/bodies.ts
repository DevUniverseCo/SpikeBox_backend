import { Type } from "@sinclair/typebox";
import { BaseSchema } from "..";
import { PositionEnum } from "../../../../application/common/enums/positionEum";
import { DataResponseArrayType, DataResponseSingleType } from "../base/bodies";

// --- DTO base per CRUD ---
export const CreateHistoryDto = Type.Object({
  player: Type.String(),
  team: Type.String(),
  season: Type.String(),
  position: Type.Enum(PositionEnum),
  jerseyNumber: Type.Optional(Type.Number()),
  isCaptain: Type.Optional(Type.Boolean()),
});

export const UpdateHistoryDto = Type.Partial(CreateHistoryDto);

export const HistoryDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateHistoryDto,
]);

// --- Response wrappers ---
export const HistoryResponseSingleDto = DataResponseSingleType(HistoryDto);
export const HistoryResponseArrayDto = DataResponseArrayType(HistoryDto);
