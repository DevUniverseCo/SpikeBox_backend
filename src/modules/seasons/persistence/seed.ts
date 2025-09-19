import { Season } from "../domain";

export const SeasonSeed = (): Season[] => {
  const seasons: Season[] = [];
  const startYear = 2015;
  const endYear = 2025;

  for (let year = startYear; year <= endYear; year++) {
    const nextYear = (year + 1) % 100;
    const seasonLabel = `${year}/${nextYear < 10 ? "0" : ""}${nextYear}`;
    seasons.push({
      name: seasonLabel,
      description: `Season ${seasonLabel}`,
      season: `${year}-${year + 1}`,
      locked: false,
    });
  }

  return seasons;
};
