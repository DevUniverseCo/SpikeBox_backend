import { FastifyInstance } from "fastify";
import { Club } from "../../../application/domain/club";
import { History } from "../../../application/domain/history";
import { Player } from "../../../application/domain/player";
import { Season } from "../../../application/domain/season";
import { Staff } from "../../../application/domain/staff";
import { Team } from "../../../application/domain/team";
import {
  ClubSchema,
  HistorySchema,
  PlayerSchema,
  SeasonSchema,
  StaffSchema,
  TeamSchema,
} from "../schema";
import { createCrudSchemasFactory } from "./crudFactory";
import { EntityDefinition } from "./types";

export const entities: Record<string, EntityDefinition<any>> = {
  seasons: {
    type: {} as Season,
    service: (app: FastifyInstance) => app.services.seasonService,
    schemas: createCrudSchemasFactory<Season>({
      typeSingle: SeasonSchema.Bodies.SeasonResponseSingleDto,
      typeArray: SeasonSchema.Bodies.SeasonResponseArrayDto,
      createBody: SeasonSchema.Bodies.CreateSeasonDto,
      updateBody: SeasonSchema.Bodies.UpdateSeasonDto,
      deleteBody: { type: "boolean" },
    }),
  },
  players: {
    type: {} as Player,
    service: (app: FastifyInstance) => app.services.playerService,
    schemas: createCrudSchemasFactory<Player>({
      typeSingle: PlayerSchema.Bodies.PlayerResponseSingleDto,
      typeArray: PlayerSchema.Bodies.PlayerResponseArrayDto,
      createBody: PlayerSchema.Bodies.CreatePlayerDto,
      updateBody: PlayerSchema.Bodies.UpdatePlayerDto,
      deleteBody: { type: "boolean" },
    }),
  },
  clubs: {
    type: {} as Club,
    service: (app: FastifyInstance) => app.services.clubService,
    schemas: createCrudSchemasFactory<Club>({
      typeSingle: ClubSchema.Bodies.ClubResponseSingleDto,
      typeArray: ClubSchema.Bodies.ClubResponseArrayDto,
      createBody: ClubSchema.Bodies.CreateClubDto,
      updateBody: ClubSchema.Bodies.UpdateClubDto,
      deleteBody: { type: "boolean" },
    }),
  },
  histories: {
    type: {} as History,
    service: (app: FastifyInstance) => app.services.historyService,
    schemas: createCrudSchemasFactory<History>({
      typeSingle: HistorySchema.Bodies.HistoryResponseSingleDto,
      typeArray: HistorySchema.Bodies.HistoryResponseArrayDto,
      createBody: HistorySchema.Bodies.CreateHistoryDto,
      updateBody: HistorySchema.Bodies.UpdateHistoryDto,
      deleteBody: { type: "boolean" },
    }),
  },
  // achievements: {
  //   type: {} as Achievement,
  //   service: (app: FastifyInstance) => app.services.achievementService,
  //   schemas: createCrudSchemasFactory<Achievement>({
  //     typeSingle: AchievementSchema.Bodies.AchievementResponseSingleDto,
  //     typeArray: AchievementSchema.Bodies.AchievementResponseArrayDto,
  //     createBody: AchievementSchema.Bodies.CreateAchievementDto,
  //     updateBody: AchievementSchema.Bodies.UpdateAchievementDto,
  //     deleteBody: { type: "boolean" },
  //   }),
  // },
  staff: {
    type: {} as Staff,
    service: (app: FastifyInstance) => app.services.staffService,
    schemas: createCrudSchemasFactory<Staff>({
      typeSingle: StaffSchema.Bodies.StaffResponseSingleDto,
      typeArray: StaffSchema.Bodies.StaffResponseArrayDto,
      createBody: StaffSchema.Bodies.CreateStaffDto,
      updateBody: StaffSchema.Bodies.UpdateStaffDto,
      deleteBody: { type: "boolean" },
    }),
  },
  teams: {
    type: {} as Team,
    service: (app: FastifyInstance) => app.services.teamService,
    schemas: createCrudSchemasFactory<Team>({
      typeSingle: TeamSchema.Bodies.TeamResponseSingleDto,
      typeArray: TeamSchema.Bodies.TeamResponseArrayDto,
      createBody: TeamSchema.Bodies.CreateTeamDto,
      updateBody: TeamSchema.Bodies.UpdateTeamDto,
      deleteBody: { type: "boolean" },
    }),
  },
};
