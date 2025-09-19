import { Type } from "@sinclair/typebox";
import { BaseSchema } from "..";
import { EntityEnum } from "../../../../application/common/enums/entityEnum";
import { DataResponseArrayType, DataResponseSingleType } from "../base/bodies";

// --- DTO base per CRUD ---
export const CreateAchievementDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  date: Type.String({ format: "date-time" }),
  entity: Type.Enum(EntityEnum),
  season: Type.String(),
  player: Type.String(),
  team: Type.String(),
});

export const UpdateAchievementDto = Type.Partial(CreateAchievementDto);

export const AchievementDto = Type.Intersect([
  BaseSchema.Bodies.Base,
  CreateAchievementDto,
]);

// --- Response wrappers ---
export const AchievementResponseSingleDto =
  DataResponseSingleType(AchievementDto);
export const AchievementResponseArrayDto =
  DataResponseArrayType(AchievementDto);
