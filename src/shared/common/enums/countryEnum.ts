export const CountryEnum = {
  ITA: "italy",
  FRA: "france",
  ESP: "spain",
  GER: "germany",
  USA: "united_states",
  CAN: "canada",
  BRA: "brazil",
  ARG: "argentina",
} as const;

export type CountryEnum = (typeof CountryEnum)[keyof typeof CountryEnum];
