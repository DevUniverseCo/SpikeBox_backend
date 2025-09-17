export const PositionEnum = {
  LIBERO: "libero",
  MIDDLE: "middle-blocker",
  OPPOSITE: "opposite",
  OUTSIDE: "outside hitter",
  SETTER: "setter",
} as const;

export type PositionEnum = (typeof PositionEnum)[keyof typeof PositionEnum];
