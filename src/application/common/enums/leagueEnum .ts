export const LeagueEnum = ["SerieA", "SerieB", "Serie C"] as const;

export type LeagueEnum = (typeof LeagueEnum)[number];
