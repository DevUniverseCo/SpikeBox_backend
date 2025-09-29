import { ColumnType, Generated } from "kysely";

export type SeasonsTable = {
  id: Generated<number>;
  name: string;
  description: string | null;
  season: string;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
