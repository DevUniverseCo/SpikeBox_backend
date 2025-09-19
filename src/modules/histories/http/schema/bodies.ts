import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";
import { PositionEnum } from "../../../../shared/common/enums/positionEum";

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
