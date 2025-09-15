export const ScoreEnum = {
  HOME: "home",
  AWAY: "away",
} as const;

export type ScoreEnum = (typeof ScoreEnum)[keyof typeof ScoreEnum];
