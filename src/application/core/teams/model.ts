import { GenderEnum } from "../../common/enums/genderEnum";
import { LevelEnum } from "../../common/enums/levelEnum ";

export type CreateTeam = {
  clubId: string;
  name: string; // nome della squadra (es. Juventus U15, Milan Prima Squadra, etc.)
  description?: string;
  level: LevelEnum; // livello della squadra (es. Under 15, Under 17, Prima Squadra, etc.)
  gender: GenderEnum; // sessione maschile o femminile
};

export type Team = {
  _id: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
} & CreateTeam;

export type UpdateTeam = Partial<CreateTeam>;
