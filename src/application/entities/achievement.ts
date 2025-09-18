import { Types } from "mongoose";
import { Base } from "./base";

export type CreateAchievement = {
  title: string;
  description?: string;
  date: Date;
  season?: Types.ObjectId; // ref Season
  player?: Types.ObjectId; // ref Player
  team?: Types.ObjectId; // ref Team
};

export type Achievement = Base & CreateAchievement;

export type UpdateAchievement = Partial<CreateAchievement>;
