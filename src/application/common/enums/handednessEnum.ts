export const HandednessEnum = {
  LEFT: "Left",
  RIGHT: "Right",
} as const;

export type HandednessEnum =
  (typeof HandednessEnum)[keyof typeof HandednessEnum];
