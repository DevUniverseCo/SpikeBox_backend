export const PositionEnum = {
  LIBERO: "libero",
  MIDDLE: "middle_blocker",
  OPPOSITE: "opposite",
  OUTSIDE: "outside_hitter",
  SETTER: "setter",
} as const;

export type PositionEnum = (typeof PositionEnum)[keyof typeof PositionEnum];
