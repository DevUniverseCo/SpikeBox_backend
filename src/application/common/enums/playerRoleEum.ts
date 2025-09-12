export const PlayerRoleEnum = {
  libero: "libero",
  middle: "middle",
  opposite: "opposite",
  outside: "outside",
  setter: "setter",
} as const;

export type PlayerRoleEnum =
  (typeof PlayerRoleEnum)[keyof typeof PlayerRoleEnum];
