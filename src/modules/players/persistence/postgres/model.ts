import { ColumnType, Generated } from "kysely";

export type PlayersTable = {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  birth_date: Date | null;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  handedness: string | null;
  country: string | null;
  biography: string | null;
  image_url: string | null;
  contact: unknown | null; // JSONB
  platform: unknown | null; // JSONB
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
