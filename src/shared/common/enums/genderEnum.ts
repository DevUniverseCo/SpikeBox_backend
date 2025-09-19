export const GenderEnum = {
  FEMALE: "female",
  MALE: "male",
} as const;

export type GenderEnum = (typeof GenderEnum)[keyof typeof GenderEnum];
