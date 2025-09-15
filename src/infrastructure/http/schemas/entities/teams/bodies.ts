import { Type } from "@sinclair/typebox";
import { BaseSchema } from "../..";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { LeagueEnum } from "../../../../../application/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../../application/common/enums/levelEnum ";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../commons/bodies";

export const CreateTeam = Type.Object({
  clubId: Type.String(),
  seasonId: Type.String(),
  name: Type.String(),
  description: Type.Optional(Type.String()),
  level: Type.Enum(LevelEnum),
  gender: Type.Enum(GenderEnum),
  league: Type.Enum(LeagueEnum),
});

export const UpdateTeam = Type.Partial(CreateTeam);

export const Team = Type.Intersect([BaseSchema.Bodies.Base, CreateTeam]);

export const TeamResponseSingle = DataResponseSingleType(Team);
export const TeamResponseArray = DataResponseArrayType(Team);
