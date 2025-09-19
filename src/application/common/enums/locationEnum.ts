export const LocationEnum = {
  ADDRESS: "address",
  LATITUDE: "latitude",
  LONGITUDE: "longitude",
} as const;

export type LocationEnum = (typeof LocationEnum)[keyof typeof LocationEnum];
