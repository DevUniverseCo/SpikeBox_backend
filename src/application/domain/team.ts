import { Types } from "mongoose";
import { GenderEnum } from "../common/enums/genderEnum";
import { LeagueEnum } from "../common/enums/leagueEnum ";
import { LevelEnum } from "../common/enums/levelEnum ";
import { LocationType } from "../common/types/locationType";
import { Base } from "./base";

export type CreateTeam = {
  name: string;
  description?: string;
  imageUrl?: string;
  location: LocationType;
  season: Types.ObjectId;
  club: Types.ObjectId;
  staff: Types.ObjectId[];
  level: LevelEnum;
  gender: GenderEnum;
  leagues: LeagueEnum[];
};

export type Team = Base & CreateTeam;
export type UpdateTeam = Partial<CreateTeam>;
