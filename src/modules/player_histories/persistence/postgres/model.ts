import { ColumnType, Generated } from "kysely";

export type PlayerHistoriesTable = {
  id: Generated<number>;
  player_id: number;
  team_id: number;
  season_id: number;
  position: string | null;
  jersey_number: number | null;
  is_captain: boolean;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
