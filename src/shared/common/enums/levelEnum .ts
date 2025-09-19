export const LevelEnum = {
  JUNIOR: "junior", // squadra giovanile
  SENIOR: "senior", // prima squadra/adulti
  RESERVE: "reserve", // seconda squadra
  AMATORI: "amatori", // squadre non professionistiche
  DISABILITY: "disability", // squadre speciali
} as const;

export type LevelEnum = (typeof LevelEnum)[keyof typeof LevelEnum];
