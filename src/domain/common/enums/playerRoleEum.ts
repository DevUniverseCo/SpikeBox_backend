export const PlayerRoleEnum = [
  "libero",
  "middle",
  "opposite",
  "outside",
  "setter",
] as const;

export type PlayerRoleEnum = (typeof PlayerRoleEnum)[number];
