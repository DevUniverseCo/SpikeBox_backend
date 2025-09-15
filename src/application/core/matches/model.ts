import { StatusEnum } from "../../common/enums/statusEnum";
import { ScoreType } from "../../common/types/scoreType";
import { Base } from "../base/model";

export type MatchTeam = {
  clubId: string;
  teamId: string;
  seasonId: string;
  homeTeamId: string; // id della squadra di casa
  awayTeamId: string; // id della squadra ospite
  homeScore: number; // set 3 della squadra di casa
  awayScore: number; // set 1 della squadra ospite
  score: ScoreType;
  status: StatusEnum;
  scheduledDate: Date; // data programmata della partita
  actualDate?: Date; // data effettiva della partita, utile se rinviata
  location: string;
  notes?: string; // note aggiuntive sulla partita
};

export type Match = Base & MatchTeam;

export type UpdateMatch = Partial<MatchTeam>;

const matches: Match[] = [
  {
    _id: "match001",
    locked: false,
    createdAt: new Date("2025-09-01T10:00:00.000Z"),
    updatedAt: new Date("2025-09-01T10:00:00.000Z"),
    clubId: "club001",
    teamId: "team001",
    seasonId: "season2025-2026",
    homeTeamId: "team001",
    awayTeamId: "team002",
    homeScore: 3,
    awayScore: 1,
    score: [
      { home: 25, away: 20 },
      { home: 22, away: 25 },
      { home: 25, away: 18 },
      { home: 25, away: 21 },
    ],
    status: StatusEnum.FINISHED,
    scheduledDate: new Date("2025-09-10T15:00:00.000Z"),
    actualDate: new Date("2025-09-10T15:00:00.000Z"),
    location: "Palazzetto XYZ, Padova",
    notes: "Partita valida per la 1ª giornata",
  },
  {
    _id: "match002",
    locked: false,
    createdAt: new Date("2025-09-02T11:00:00.000Z"),
    updatedAt: new Date("2025-09-02T11:00:00.000Z"),
    clubId: "club001",
    teamId: "team003",
    seasonId: "season2025-2026",
    homeTeamId: "team003",
    awayTeamId: "team004",
    homeScore: 0,
    awayScore: 3,
    score: [
      { home: 18, away: 25 },
      { home: 20, away: 25 },
      { home: 21, away: 25 },
    ],
    status: StatusEnum.FINISHED,
    scheduledDate: new Date("2025-09-11T17:00:00.000Z"),
    actualDate: new Date("2025-09-11T17:00:00.000Z"),
    location: "Palazzetto ABC, Verona",
    notes: "Partita amichevole",
  },
  {
    _id: "match003",
    locked: false,
    createdAt: new Date("2025-09-03T15:00:00.000Z"),
    updatedAt: new Date("2025-09-03T15:00:00.000Z"),
    clubId: "club002",
    teamId: "team005",
    seasonId: "season2025-2026",
    homeTeamId: "team005",
    awayTeamId: "team006",
    homeScore: 2,
    awayScore: 3,
    score: [
      { home: 25, away: 23 },
      { home: 22, away: 25 },
      { home: 25, away: 21 },
      { home: 20, away: 25 },
      { home: 12, away: 15 },
    ],
    status: StatusEnum.FINISHED,
    scheduledDate: new Date("2025-09-12T14:30:00.000Z"),
    actualDate: new Date("2025-09-12T14:30:00.000Z"),
    location: "Palazzetto DEF, Vicenza",
  },
  {
    _id: "match004",
    locked: false,
    createdAt: new Date("2025-09-04T09:30:00.000Z"),
    updatedAt: new Date("2025-09-04T09:30:00.000Z"),
    clubId: "club001",
    teamId: "team002",
    seasonId: "season2025-2026",
    homeTeamId: "team002",
    awayTeamId: "team001",
    homeScore: 1,
    awayScore: 3,
    score: [
      { home: 21, away: 25 },
      { home: 25, away: 23 },
      { home: 19, away: 25 },
      { home: 20, away: 25 },
    ],
    status: StatusEnum.FINISHED,
    scheduledDate: new Date("2025-09-13T16:00:00.000Z"),
    location: "Palazzetto GHI, Padova",
  },
  {
    _id: "match005",
    locked: false,
    createdAt: new Date("2025-09-05T12:00:00.000Z"),
    updatedAt: new Date("2025-09-05T12:00:00.000Z"),
    clubId: "club002",
    teamId: "team006",
    seasonId: "season2025-2026",
    homeTeamId: "team006",
    awayTeamId: "team005",
    homeScore: 3,
    awayScore: 0,
    score: [
      { home: 25, away: 17 },
      { home: 25, away: 20 },
      { home: 25, away: 18 },
    ],
    status: StatusEnum.FINISHED,
    scheduledDate: new Date("2025-09-14T18:00:00.000Z"),
    location: "Palazzetto JKL, Verona",
  },
];
