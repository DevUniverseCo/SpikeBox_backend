export const SocialPlatformEnum = ["instagram", "facebook", "twitter"] as const;
export type SocialPlatformEnum = (typeof SocialPlatformEnum)[number];

export type SocialLinks = Partial<Record<SocialPlatformEnum, string>>;
