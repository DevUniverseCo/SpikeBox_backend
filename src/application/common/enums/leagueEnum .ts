export const LeagueEnum = {
  A1: "serie A1",
  A2: "serie A2",
  A3: "serie A3",
  B: "serie B",
  B1: "serie B1",
  B2: "serie B2",
  C: "serie C",
  D: "serie D",
  NATIONAL: "national",
  REGIONAL: "regional",
  PROVINCIAL: "provincial",
} as const;

export type LeagueEnum = (typeof LeagueEnum)[keyof typeof LeagueEnum];
