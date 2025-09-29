import { AchievementsTable } from "../../../../modules/achievements/persistence/postgres/model";
import { ClubsTable } from "../../../../modules/clubs/persistence/postgres/model";
import { PlayerHistoriesTable } from "../../../../modules/player_histories/persistence/postgres/model";
import { PlayersTable } from "../../../../modules/players/persistence/postgres/model";
import { PostsTable } from "../../../../modules/posts/persistence/postgres/model";
import { SeasonsTable } from "../../../../modules/seasons/persistence/postgres/model";
import { StaffTable } from "../../../../modules/staff/persistence/postgres/model";
import { StaffHistoriesTable } from "../../../../modules/staff_histories/persistence/postgres/model";
import { TeamsTable } from "../../../../modules/teams/persistence/postgres/model";
import { UsersTable } from "../../../../modules/users/persistence/postgres/model";

// Database interface principale per Kysely
export interface Database {
  achievements: AchievementsTable;
  clubs: ClubsTable;
  player_histories: PlayerHistoriesTable;
  players: PlayersTable;
  posts: PostsTable;
  seasons: SeasonsTable;
  staff: StaffTable;
  staff_histories: StaffHistoriesTable;
  teams: TeamsTable;
  users: UsersTable;
}

// Re-export dei tipi utili
export type {
  AchievementsTable,
  ClubsTable,
  PlayerHistoriesTable,
  PlayersTable,
  PostsTable,
  SeasonsTable,
  StaffHistoriesTable,
  StaffTable,
  TeamsTable,
  UsersTable,
};
