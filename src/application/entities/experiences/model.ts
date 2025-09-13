import { ObjectId } from "mongodb";
import { LeagueEnum } from "../../common/enums/leagueEnum ";
import { PlayerRoleEnum } from "../../common/enums/playerRoleEum";

export type CreateExperience = {
  playerId: ObjectId;
  clubId: ObjectId;
  league: LeagueEnum;
  seasonStartYear: number;
  seasonEndYear: number;
  role: PlayerRoleEnum;
  jerseyNumber?: number;
};

export type Experience = {
  _id: ObjectId;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateExperience;

export type UpdateExperience = Partial<CreateExperience>;
