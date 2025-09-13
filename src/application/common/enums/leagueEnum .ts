export const LeagueEnum = {
  SerieA: "SerieA",
  SerieB: "SerieB",
  SerieC: "SerieC",
} as const;

export type LeagueEnum = (typeof LeagueEnum)[keyof typeof LeagueEnum];
