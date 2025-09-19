export const HandednessEnum = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type HandednessEnum =
  (typeof HandednessEnum)[keyof typeof HandednessEnum];
