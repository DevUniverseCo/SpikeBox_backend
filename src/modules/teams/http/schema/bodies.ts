import { Type } from "@sinclair/typebox";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/base/http/schema/bodies";
import { GenderEnum } from "../../../../shared/common/enums/genderEnum";
import { LeagueEnum } from "../../../../shared/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../shared/common/enums/levelEnum ";

// --- LocationType generico (puoi dettagliare se vuoi) ---
const LocationDto = Type.Object({}, { additionalProperties: true });

// --- DTO base per CRUD ---
export const CreateTeamDto = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String({ format: "uri" })),
  location: Type.Optional(LocationDto),
  season: Type.String(),
  club: Type.String(),
  staff: Type.Optional(Type.Array(Type.String())),
  level: Type.Enum(LevelEnum),
  gender: Type.Enum(GenderEnum),
  leagues: Type.Array(Type.Enum(LeagueEnum)),
});

export const UpdateTeamDto = Type.Partial(CreateTeamDto);

export const TeamDto = Type.Intersect([BaseSchema.Bodies.Base, CreateTeamDto]);

// --- Response wrappers ---
export const TeamResponseSingleDto = DataResponseSingleType(TeamDto);
export const TeamResponseArrayDto = DataResponseArrayType(TeamDto);
