export const PositionEnum = {
  LIBERO: "libero",
  MIDDLE: "middle",
  OPPOSITE: "opposite",
  OUTSIDE: "outside",
  SETTER: "setter",
} as const;

export type PositionEnum = (typeof PositionEnum)[keyof typeof PositionEnum];
