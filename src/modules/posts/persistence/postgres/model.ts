import { ColumnType, Generated } from "kysely";

export type PostsTable = {
  id: Generated<number>;
  title: string;
  content: string | null;
  image: string | null;
  author_id: number;
  tags: string[] | null;
  published_at: Date | null;
  locked: boolean;
  locked_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
};
