export const PlatformEnum = {
  instagram: "instagram",
  facebook: "facebook",
  twitter: "twitter",
  youtube: "youtube",
  tiktok: "tiktok",
} as const;

export type PlatformEnum = (typeof PlatformEnum)[keyof typeof PlatformEnum];
