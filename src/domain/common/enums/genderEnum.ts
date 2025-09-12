export const GenderEnum = ["female", "male"] as const;

export type GenderEnum = (typeof GenderEnum)[number];
