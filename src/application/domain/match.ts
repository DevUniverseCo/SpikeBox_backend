import { Types } from "mongoose";
import { StatusEnum } from "../common/enums/statusEnum";
import { LocationType } from "../common/types/locationType";
import { Base } from "./base";

export type MatchScore = {
  teamA: number; // punti del team A
  teamB: number; // punti del team B
};

export type MatchSet = {
  setNumber: number;
  score: MatchScore;
};

export type MatchUser = {
  season: Types.ObjectId;
  scheduledDate: Date; // data programmata
  rescheduledDate?: Date; // data di rinvio (opzionale)
  location: LocationType;
  rescheduledLocation?: LocationType; // luogo di rinvio (opzionale)
  homeTeam: Types.ObjectId;
  awayTeam: Types.ObjectId;
  homeScore?: number;
  awayScore?: number;
  setScores?: MatchSet[];
  status: StatusEnum;
};

export type Match = Base & MatchUser;
export type UpdateMatch = Partial<MatchUser>;
