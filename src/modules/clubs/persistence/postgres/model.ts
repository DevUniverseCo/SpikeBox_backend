import { ColumnType, Generated } from "kysely";

export type ClubsTable = {
  id: Generated<number>;
  name: string;
  description: string | null;
  foundation_year: number | null;
  logo_url: string | null;
  contact: Record<string, unknown> | null;
  location: Record<string, unknown> | null;
  platform: Record<string, unknown> | null;
  locked: boolean | null;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
