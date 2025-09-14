import { LeagueEnum } from "../../common/enums/leagueEnum ";
import { PlayerRoleEnum } from "../../common/enums/playerRoleEum";

export type CreateExperience = {
  playerId: string;
  clubId: string;
  league: LeagueEnum;
  seasonStartYear: number;
  seasonEndYear: number;
  role: PlayerRoleEnum;
  jerseyNumber?: number;
};

export type Experience = {
  _id: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateExperience;

export type UpdateExperience = Partial<CreateExperience>;
