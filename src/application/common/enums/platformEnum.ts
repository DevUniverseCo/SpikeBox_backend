export const PlatformEnum = {
  instagram: "instagram",
  facebook: "facebook",
  twitter: "twitter",
  youtube: "youtube",
  tiktok: "tiktok",
  other: "other",
} as const;

export type PlatformEnum = (typeof PlatformEnum)[keyof typeof PlatformEnum];
