import { Types } from "mongoose";
import { GenderEnum } from "../../../shared/common/enums/genderEnum";
import { LeagueEnum } from "../../../shared/common/enums/leagueEnum ";
import { LevelEnum } from "../../../shared/common/enums/levelEnum ";
import { Team } from "../domain";

export const TeamSeed = (
  clubId: Types.ObjectId,
  seasonId: Types.ObjectId,
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
