export const ContactEnum = {
  PHONE: "phone",
  EMAIL: "email",
  ADDRESS: "address",
  WEBSITE: "website",
} as const;

export type ContactEnum = (typeof ContactEnum)[keyof typeof ContactEnum];
