import { Season } from "../../../../../application/entities/season";

export const SeasonSeed = () => {
  const season: Season = {
    name: "2025/2026",
    description: "Season 2025/2026",
    season: "2025-2026",
    teams: [],
    locked: false,
  };
  return season;
};
