import { GenderEnum } from "../../common/enums/genderEnum";
import { LeagueEnum } from "../../common/enums/leagueEnum ";
import { LevelEnum } from "../../common/enums/levelEnum ";
import { Base } from "../base/model";

export type CreateTeam = {
  clubId: string;
  seasonId: string;
  name: string; // nome della squadra (es. Juventus U15, Milan Prima Squadra, etc.)
  description?: string;
  level: LevelEnum; // livello della squadra (es. Under 15, Under 17, Prima Squadra, etc.)
  gender: GenderEnum; // sessione maschile o femminile
  league: LeagueEnum;
};

export type Team = Base & CreateTeam;

export type UpdateTeam = Partial<CreateTeam>;

const teams: Team[] = [
  {
    _id: "team001",
    locked: false,
    createdAt: new Date("2024-07-01T10:00:00.000Z"),
    updatedAt: new Date("2024-07-01T10:00:00.000Z"),
    clubId: "123456789abcdef01234567", // ASD Volley Veneto Cavaion
    seasonId: "season2024-2025",
    name: "Volley Veneto Cavaion U15",
    description: "Squadra giovanile Under 15 maschile",
    level: LevelEnum.JUNIOR,
    gender: GenderEnum.MALE,
    league: LeagueEnum.B,
  },
  {
    _id: "team002",
    locked: false,
    createdAt: new Date("2024-07-02T09:30:00.000Z"),
    updatedAt: new Date("2024-07-02T09:30:00.000Z"),
    clubId: "123456789abcdef01234567", // ASD Volley Veneto Cavaion
    seasonId: "season2024-2025",
    name: "Volley Veneto Cavaion Prima Squadra Femminile",
    description: "Prima squadra femminile impegnata nel campionato regionale",
    level: LevelEnum.SENIOR,
    gender: GenderEnum.FEMALE,
    league: LeagueEnum.REGIONAL,
  },
  {
    _id: "team003",
    locked: false,
    createdAt: new Date("2024-07-03T11:00:00.000Z"),
    updatedAt: new Date("2024-07-03T11:00:00.000Z"),
    clubId: "987654321abcdef01234567", // Polisportiva Pallavolo Verona
    seasonId: "season2024-2025",
    name: "Pallavolo Verona U17",
    description: "Squadra Under 17 maschile con prospettive nazionali",
    level: LevelEnum.JUNIOR,
    gender: GenderEnum.MALE,
    league: LeagueEnum.NATIONAL,
  },
  {
    _id: "team004",
    locked: false,
    createdAt: new Date("2024-07-04T14:15:00.000Z"),
    updatedAt: new Date("2024-07-04T14:15:00.000Z"),
    clubId: "987654321abcdef01234567", // Polisportiva Pallavolo Verona
    seasonId: "season2024-2025",
    name: "Pallavolo Verona U13 Femminile",
    description: "Squadra giovanile femminile di base",
    level: LevelEnum.JUNIOR,
    gender: GenderEnum.FEMALE,
    league: LeagueEnum.PROVINCIAL,
  },
  {
    _id: "team005",
    locked: false,
    createdAt: new Date("2024-07-05T16:45:00.000Z"),
    updatedAt: new Date("2024-07-05T16:45:00.000Z"),
    clubId: "987654321abcdef01234567", // Polisportiva Pallavolo Verona
    seasonId: "season2024-2025",
    name: "Pallavolo Verona Prima Squadra Maschile",
    description: "Prima squadra maschile militante in Serie B nazionale",
    level: LevelEnum.SENIOR,
    gender: GenderEnum.MALE,
    league: LeagueEnum.NATIONAL,
  },
];
