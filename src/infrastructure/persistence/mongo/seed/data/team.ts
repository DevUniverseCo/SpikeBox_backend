import { Types } from "mongoose";
import { GenderEnum } from "../../../../../application/common/enums/genderEnum";
import { LeagueEnum } from "../../../../../application/common/enums/leagueEnum ";
import { LevelEnum } from "../../../../../application/common/enums/levelEnum ";
import { Team } from "../../../../../application/domain/team";

export const TeamSeed = (
  seasonId: Types.ObjectId,
  clubId: Types.ObjectId,
  staffIds: Types.ObjectId[]
) => {
  const team: Team = {
    name: "Volley Veneto Cavaion SERIE B",
    description: "Main team of Volley Veneto Cavaion competing in Serie B.",
    club: clubId,
    season: seasonId,
    staff: staffIds,
    level: LevelEnum.SENIOR,
    gender: GenderEnum.MALE,
    leagues: [LeagueEnum.SERIE_B],
    locked: false,
  };
  return team;
};
