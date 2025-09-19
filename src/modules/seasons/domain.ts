import { Base } from "../../shared/common/base/domain";

export type CreateSeason = {
  name: string; // es: "2025/2026"
  description?: string;
  season: string; // e.g., "2022-2023"
};

export type Season = Base & CreateSeason;
export type UpdateSeason = Partial<CreateSeason>;
