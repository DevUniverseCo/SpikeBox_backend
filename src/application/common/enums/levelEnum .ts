export const LevelEnum = {
  JUNIOR: "junior",
  SENIOR: "senior",
} as const;

export type LevelEnum = (typeof LevelEnum)[keyof typeof LevelEnum];
