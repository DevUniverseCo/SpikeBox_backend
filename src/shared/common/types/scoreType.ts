import { ScoreEnum } from "../enums/scoreEnum";

export type ScoreType = {
  [key in ScoreEnum]: number;
}[];
