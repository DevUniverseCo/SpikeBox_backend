import _ from "lodash";
import { AchievementModel } from "../../../../../modules/achievements/persistence/model";
import { ClubModel } from "../../../../../modules/clubs/persistence/model";
import { ClubSeed } from "../../../../../modules/clubs/persistence/seed";
import { HistoryModel } from "../../../../../modules/histories/persistence/model";
import { HistorySeed } from "../../../../../modules/histories/persistence/seed";
import { PlayerModel } from "../../../../../modules/players/persistence/model";
import { PlayerSeed } from "../../../../../modules/players/persistence/seed";
import { Post } from "../../../../../modules/posts/domain";
import { PostModel } from "../../../../../modules/posts/persistence/model";
import { PostSeed } from "../../../../../modules/posts/persistence/seed";
import { SeasonModel } from "../../../../../modules/seasons/persistence/model";
import { SeasonSeed } from "../../../../../modules/seasons/persistence/seed";
import { StaffModel } from "../../../../../modules/staff/persistence/model";
import { StaffSeed } from "../../../../../modules/staff/persistence/seed";
import { TeamModel } from "../../../../../modules/teams/persistence/model";
import { TeamSeed } from "../../../../../modules/teams/persistence/seed";
import { User } from "../../../../../modules/users/domain";
import { UserModel } from "../../../../../modules/users/persistence/model";
import { UserSeed } from "../../../../../modules/users/persistence/seed";

export async function seed() {
  await Promise.all([
    ClubModel.deleteMany(),
    TeamModel.deleteMany(),
    UserModel.deleteMany(),
    PostModel.deleteMany(),
    StaffModel.deleteMany(),
    PlayerModel.deleteMany(),
    SeasonModel.deleteMany(),
    HistoryModel.deleteMany(),
    AchievementModel.deleteMany(),
  ]);

  // CREA CLUB
  const club = ClubSeed();
  const newClub = await ClubModel.create(club);

  // CREA SEASONS
  const seasons = SeasonSeed();
  const newSeasons = await SeasonModel.create(seasons);

  // CREA PLAYERS
  const players = PlayerSeed();
  const newPlayers = await PlayerModel.create(players);

  // CREA STAFF
  const staff = StaffSeed();
  const newStaff = await StaffModel.create(staff);

  // CREA TEAM
  const lastSeason = _.last(newSeasons);
  if (!lastSeason) {
    throw new Error("No seasons found to assign to team.");
  }
  const team = TeamSeed(
    newClub._id,
    lastSeason._id,
    newStaff.map((s) => s._id)
  );
  const newTeam = await TeamModel.create(team);

  // CREA ACHIEVEMENT
  // const achievement: Achievement = AchievementSeed(
  //   newSeason._id,
  //   undefined,
  //   newTeam._id
  // );
  // await AchievementModel.create(achievement);

  // CREATE HISTORY
  if (!lastSeason) {
    throw new Error("No seasons found to assign to team.");
  }
  const histories = HistorySeed(
    newTeam._id,
    newPlayers.map((s) => s._id),
    lastSeason._id
  );
  await HistoryModel.create(histories);

  // CREATE USER
  const user: User = UserSeed();
  const newUser = await UserModel.create(user);

  // CREATE POST
  const post: Post = PostSeed(newUser._id);
  await PostModel.create(post);
}
