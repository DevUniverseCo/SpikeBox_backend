import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import { PositionEnum } from "../../../../../application/common/enums/positionEum";
import { DataResponseArray, DataResponseSingle } from "../../commons/bodies";

export const CreateHistory = Type.Object({
  seasonId: Type.String(),
  playerId: Type.String(),
  teamId: Type.String(),
  clubId: Type.String(),
  position: Type.Enum(PositionEnum),
  isCaptain: Type.Optional(Type.Boolean({ default: false })),
  jerseyNumber: Type.Optional(Type.Number()),
});

export const UpdateHistory = Type.Partial(CreateHistory);

export const History = Type.Intersect([BaseSchema.Bodies.Base, CreateHistory]);

export const HistoryResponseSingle = DataResponseSingle(History);
export const HistoryResponseArray = DataResponseArray(History);
