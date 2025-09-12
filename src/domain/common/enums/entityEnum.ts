export const EntityEnum = ["club", "player"] as const;

export type EntityEnum = (typeof EntityEnum)[number];
