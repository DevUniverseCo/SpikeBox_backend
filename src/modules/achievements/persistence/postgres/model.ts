import { ColumnType, Generated } from "kysely";

export type AchievementsTable = {
  id: Generated<number>;
  name: string;
  description: string | null;
  date: Date;
  player_id: number | null;
  team_id: number | null;
  entity: string | null;
  locked: boolean | null;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
