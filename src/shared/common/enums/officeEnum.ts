export const OfficeEnum = {
  COACH: "coach",
  VICECOACH: "vice_coach",
  ATHLETIC_TRAINER: "athletic_trainer",
  PHYSIOTHERAPIST: "physiotherapist",
  DOCTOR: "doctor",
  MANAGER: "manager",
  DIRECTOR: "director",
  PRESIDENT: "president",
  SCOUTER: "scouter",
  PRESS_OFFICER: "press_officer",
  OTHER: "other",
} as const;

export type OfficeEnum = (typeof OfficeEnum)[keyof typeof OfficeEnum];
