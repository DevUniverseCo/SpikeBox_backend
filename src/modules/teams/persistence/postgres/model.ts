import { ColumnType, Generated } from "kysely";

export type TeamsTable = {
  id: Generated<number>;
  name: string;
  description: string | null;
  image_url: string | null;
  location: unknown | null; // JSONB
  season_id: number;
  club_id: number;
  level: string | null;
  gender: string | null;
  leagues: string[] | null;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
