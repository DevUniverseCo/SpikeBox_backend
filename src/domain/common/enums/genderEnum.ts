export const GenderEnum = {
  female: "female",
  male: "male",
} as const;

export type GenderEnum = (typeof GenderEnum)[keyof typeof GenderEnum];
