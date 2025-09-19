export const StatusEnum = {
  PENDING: "pending",
  PROGRESS: "progress",
  FINISHED: "finished",
} as const;

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];
