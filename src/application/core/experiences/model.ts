import { LeagueEnum } from "../../common/enums/leagueEnum ";
import { PositionEnum } from "../../common/enums/positionEum";

export type CreateExperience = {
  clubId: string;
  teamId: string;
  playerId: string;
  seasonKey: string; // e.g., "2022-2023"
  fromDate: Date; // e.g., "2022-08-01"
  toDate: Date; // e.g., "2023-05-30"
  league: LeagueEnum;
  position: PositionEnum;
  jerseyNumber?: number;
  isCaptain?: boolean;
};

export type Experience = {
  _id: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateExperience;

export type UpdateExperience = Partial<CreateExperience>;
