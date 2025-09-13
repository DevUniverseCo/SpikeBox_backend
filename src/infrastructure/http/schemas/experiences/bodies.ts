import { Type } from "@sinclair/typebox";
import { LeagueEnum } from "../../../../application/common/enums/leagueEnum ";
import { PlayerRoleEnum } from "../../../../application/common/enums/playerRoleEum";

export const CreateExperience = Type.Object({
  playerId: Type.String(),
  clubId: Type.String(),
  league: Type.Enum(LeagueEnum),
  seasonStartYear: Type.Number(),
  seasonEndYear: Type.Number(),
  role: Type.Enum(PlayerRoleEnum),
  jerseyNumber: Type.Optional(Type.Number()),
});

export const UpdateExperience = Type.Partial(CreateExperience);

export const Experience = Type.Intersect([
  Type.Object({
    _id: Type.Optional(Type.String()),
    locked: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
  CreateExperience,
]);

export const Experiences = Type.Array(Experience);

export const ExperiencesPaginated = Type.Object({
  items: Experiences,
  total: Type.Number(),
  page: Type.Number(),
  limit: Type.Number(),
});
