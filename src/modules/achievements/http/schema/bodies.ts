import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";
import { EntityEnum } from "../../../../shared/common/enums/entityEnum";

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
