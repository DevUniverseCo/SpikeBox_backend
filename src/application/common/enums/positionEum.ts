export const PositionEnum = {
  LIBERO: "libero",
  MIDDLE_BLOCKER: "middle_blocker",
  OPPOSITE: "opposite",
  OUTSIDE_HITTER: "outside_hitter",
  SETTER: "setter",
  OTHER: "other",
} as const;

export type PositionEnum = (typeof PositionEnum)[keyof typeof PositionEnum];
