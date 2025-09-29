import { ColumnType, Generated } from "kysely";

export type UsersTable = {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
  role: string;
  image_url: string | null;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
