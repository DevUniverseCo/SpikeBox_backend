import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import { StatusEnum } from "../../../../../application/common/enums/statusEnum";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../commons/bodies";

export const CreateMatch = Type.Object({
  clubId: Type.String(),
  teamId: Type.String(),
  seasonId: Type.String(),
  homeTeamId: Type.String(),
  awayTeamId: Type.String(),
  homeScore: Type.Number(),
  awayScore: Type.Number(),
  score: Type.Array(
    Type.Object({
      home: Type.Number(),
      away: Type.Number(),
    })
  ),
  status: Type.Enum(StatusEnum),
  scheduledDate: Type.String({ format: "date-time" }),
  actualDate: Type.Optional(Type.String({ format: "date-time" })),
  location: Type.String(),
  notes: Type.Optional(Type.String()),
});

export const UpdateMatch = Type.Partial(CreateMatch);

export const Match = Type.Intersect([BaseSchema.Bodies.Base, CreateMatch]);

export const MatchResponseSingle = DataResponseSingleType(Match);
export const MatchResponseArray = DataResponseArrayType(Match);
