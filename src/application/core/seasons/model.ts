import { Base } from "../base/model";

export type CreateSeason = {
  clubId: string;
  name: string; // es: "2025/2026"
  seasonKey: string; // e.g., "2022-2023"
  startDate?: Date;
  endDate?: Date;
};

export type Season = Base & CreateSeason;

export type UpdateSeason = Partial<CreateSeason>;

const seasons: Season[] = [
  {
    _id: "64a1b2c3d4e5f67890123456",
    locked: false,
    createdAt: new Date("2023-05-10T10:00:00Z"),
    updatedAt: new Date("2023-05-10T10:00:00Z"),
    clubId: "123456789abcdef01234567", // ASD Volley Veneto Cavaion
    name: "2023/2024",
    seasonKey: "2023-2024",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-06-30"),
  },
  {
    _id: "74b2c3d4e5f6789012345678",
    locked: false,
    createdAt: new Date("2024-05-15T09:00:00Z"),
    updatedAt: new Date("2024-05-15T09:00:00Z"),
    clubId: "987654321abcdef01234567", // Polisportiva Pallavolo Verona
    name: "2024/2025",
    seasonKey: "2024-2025",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-06-30"),
  },
  {
    _id: "84c3d4e5f678901234567890",
    locked: false,
    createdAt: new Date("2025-05-20T14:30:00Z"),
    updatedAt: new Date("2025-05-20T14:30:00Z"),
    clubId: "123456789abcdef01234567", // ASD Volley Veneto Cavaion
    name: "2025/2026",
    seasonKey: "2025-2026",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-06-30"),
  },
];
