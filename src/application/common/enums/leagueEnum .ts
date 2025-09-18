export const LeagueEnum = {
  U13: "u13",
  U15: "u15",
  U17: "u17",
  U19: "u19",
  SERIE_A: "serie_a",
  SERIE_A2: "serie_a2",
  SERIE_A3: "serie_a3",
  SERIE_B: "serie_b",
  SERIE_B2: "serie_b2",
  SERIE_C: "serie_c",
  SERIE_D: "serie_d",
  NATIONAL: "national",
  REGIONAL: "regional",
  PROVINCIAL: "provincial",
} as const;

export type LeagueEnum = (typeof LeagueEnum)[keyof typeof LeagueEnum];
