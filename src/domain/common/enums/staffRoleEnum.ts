export const StaffRoleEnum = [
  "Head Coach",
  "Fitness Coach",
  "President",
  "Vice President",
  "Sporting Director",
  "Press Officer",
] as const;

export type StaffRoleEnum = (typeof StaffRoleEnum)[number];
