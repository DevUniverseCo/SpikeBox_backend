import { PositionEnum } from "../../common/enums/positionEum";
import { Base } from "../base/model";

export type CreateHistory = {
  seasonId: string;
  playerId: string;
  teamId: string;
  clubId: string; // aggiunto per semplificare le query
  position?: PositionEnum;
  jerseyNumber?: number;
  isCaptain?: boolean;
};

export type History = Base & CreateHistory;

export type UpdateHistory = Partial<CreateHistory>;

const history: History[] = [
  {
    _id: "hist001",
    locked: false,
    createdAt: new Date("2024-07-01T10:00:00.000Z"),
    updatedAt: new Date("2024-07-01T10:00:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player001",
    teamId: "team001",
    clubId: "club001",
    position: PositionEnum.SETTER,
    jerseyNumber: 7,
    isCaptain: false,
  },
  {
    _id: "hist002",
    locked: false,
    createdAt: new Date("2024-07-02T11:00:00.000Z"),
    updatedAt: new Date("2024-07-02T11:00:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player002",
    teamId: "team002",
    clubId: "club001",
    position: PositionEnum.LIBERO,
    jerseyNumber: 1,
    isCaptain: true,
  },
  {
    _id: "hist003",
    locked: false,
    createdAt: new Date("2024-07-03T12:00:00.000Z"),
    updatedAt: new Date("2024-07-03T12:00:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player003",
    teamId: "team005",
    clubId: "club002",
    position: PositionEnum.MIDDLE,
    jerseyNumber: 10,
    isCaptain: false,
  },
  {
    _id: "hist004",
    locked: false,
    createdAt: new Date("2024-07-04T09:30:00.000Z"),
    updatedAt: new Date("2024-07-04T09:30:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player004",
    teamId: "team004",
    clubId: "club001",
    position: PositionEnum.OUTSIDE,
    jerseyNumber: 15,
    isCaptain: false,
  },
  {
    _id: "hist005",
    locked: false,
    createdAt: new Date("2024-07-05T14:15:00.000Z"),
    updatedAt: new Date("2024-07-05T14:15:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player005",
    teamId: "team005",
    clubId: "club002",
    position: PositionEnum.OPPOSITE,
    jerseyNumber: 9,
    isCaptain: true,
  },
  {
    _id: "hist006",
    locked: false,
    createdAt: new Date("2024-07-06T16:00:00.000Z"),
    updatedAt: new Date("2024-07-06T16:00:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player001",
    teamId: "team003",
    clubId: "club001",
    position: PositionEnum.SETTER,
    jerseyNumber: 7,
    isCaptain: false,
  },
  {
    _id: "hist007",
    locked: false,
    createdAt: new Date("2024-07-07T08:45:00.000Z"),
    updatedAt: new Date("2024-07-07T08:45:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player002",
    teamId: "team003",
    clubId: "club001",
    position: PositionEnum.LIBERO,
    jerseyNumber: 1,
    isCaptain: false,
  },
  {
    _id: "hist008",
    locked: false,
    createdAt: new Date("2024-07-08T11:30:00.000Z"),
    updatedAt: new Date("2024-07-08T11:30:00.000Z"),
    seasonId: "season2024-2025",
    playerId: "player004",
    teamId: "team004",
    clubId: "club001",
    position: PositionEnum.OUTSIDE,
    jerseyNumber: 15,
    isCaptain: true,
  },
];
