export const CountryEnum = {
  ITA: "Italy",
  FRA: "France",
  ESP: "Spain",
} as const;

export type CountryEnum = (typeof CountryEnum)[keyof typeof CountryEnum];
