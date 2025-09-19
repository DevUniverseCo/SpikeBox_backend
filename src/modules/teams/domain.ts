import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";
import { GenderEnum } from "../../shared/common/enums/genderEnum";
import { LeagueEnum } from "../../shared/common/enums/leagueEnum ";
import { LevelEnum } from "../../shared/common/enums/levelEnum ";
import { LocationType } from "../../shared/common/types/locationType";

export type CreateTeam = {
  name: string;
  description?: string;
  imageUrl?: string;
  location?: LocationType;
  season: Types.ObjectId;
  club: Types.ObjectId;
  staff: Types.ObjectId[];
  level: LevelEnum;
  gender: GenderEnum;
  leagues: LeagueEnum[];
};

export type Team = Base & CreateTeam;
export type UpdateTeam = Partial<CreateTeam>;
