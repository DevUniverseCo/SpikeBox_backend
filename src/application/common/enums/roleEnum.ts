export const RoleEnum = {
  USER: "user",
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];
