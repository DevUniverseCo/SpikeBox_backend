import { Types } from "mongoose";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { LeagueEnum } from "../../../../../application/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../../application/common/enums/levelEnum ";
import { Team } from "../../../../../application/entities/team";

export const TeamSeed = (
  clubId: Types.ObjectId,
  seasonId: Types.ObjectId,
  staffIds: Types.ObjectId[],
  rosterIds: Types.ObjectId[],
  achievementsIds: Types.ObjectId[]
) => {
  const team: Team = {
    name: "Volley Veneto Cavaion SERIE B",
    description: "Main team of Volley Veneto Cavaion competing in Serie B.",
    club: clubId,
    season: seasonId,
    roster: rosterIds,
    staff: staffIds,
    achievements: achievementsIds,
    level: LevelEnum.SENIOR,
    gender: GenderEnum.MALE,
    leagues: [LeagueEnum.SERIE_B],
    locked: false,
  };
  return team;
};
