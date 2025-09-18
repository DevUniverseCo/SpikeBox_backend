import { Types } from "mongoose";
import { GenderEnum } from "../common/enums/genderEnum";
import { LeagueEnum } from "../common/enums/leagueEnum ";
import { LevelEnum } from "../common/enums/levelEnum ";
import { Base } from "./base";

// TEAM
export type CreateTeam = {
  name: string; // es. "Juventus U15"
  description?: string;
  season: Types.ObjectId; // ref Season
  club: Types.ObjectId; // ref Club
  roster: Types.ObjectId[]; // ref Player
  staff: Types.ObjectId[]; // ref Staff
  achievements?: Types.ObjectId[]; // ref Achievement
  level: LevelEnum;
  gender: GenderEnum;
  leagues: LeagueEnum[];
};

export type Team = Base & CreateTeam;

export type UpdateTeam = Partial<CreateTeam>;
