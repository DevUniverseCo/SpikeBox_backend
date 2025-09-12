export const UnitEnum = ["cm", "inch", "kg", "lbs"] as const;
export type UnitEnum = (typeof UnitEnum)[number];
