export const EntityEnum = {
  PLAYER: "player",
  STAFF: "staff",
  TEAM: "team",
} as const;

export type EntityEnum = (typeof EntityEnum)[keyof typeof EntityEnum];
