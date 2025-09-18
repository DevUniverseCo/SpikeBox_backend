import { Types } from "mongoose";
import { Base } from "./base";

export type CreateSeason = {
  name: string; // es: "2025/2026"
  description?: string;
  season: string; // e.g., "2022-2023"
  teams?: Types.ObjectId[]; // ref Team
};

export type Season = Base & CreateSeason;

export type UpdateSeason = Partial<CreateSeason>;
