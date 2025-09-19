import { Season } from "../../../../../application/domain/season";

export const SeasonSeed = () => {
  const season: Season = {
    name: "2025/2026",
    description: "Season 2025/2026",
    season: "2025-2026",
    locked: false,
  };
  return season;
};
