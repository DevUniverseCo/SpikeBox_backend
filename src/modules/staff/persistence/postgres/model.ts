import { ColumnType, Generated } from "kysely";

export type StaffTable = {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  birth_date: Date | null;
  country: string | null;
  biography: string | null;
  image_url: string | null;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
