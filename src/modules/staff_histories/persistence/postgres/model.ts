import { ColumnType, Generated } from "kysely";

export type StaffHistoriesTable = {
  id: Generated<number>;
  staff_id: number;
  team_id: number;
  season_id: number;
  office: string[] | null;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
