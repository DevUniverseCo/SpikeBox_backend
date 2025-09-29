import _ from "lodash";
import { AchievementModel } from "../../../../../modules/achievements/persistence/mongo/model";
import { ClubModel } from "../../../../../modules/clubs/persistence/mongo/model";
import { ClubSeed } from "../../../../../modules/clubs/persistence/mongo/seed";
import { PlayerHistoryModel } from "../../../../../modules/player_histories/persistence/mongo/model";
import { HistorySeed } from "../../../../../modules/player_histories/persistence/mongo/seed";
import { PlayerModel } from "../../../../../modules/players/persistence/mongo/model";
import { PlayerSeed } from "../../../../../modules/players/persistence/mongo/seed";
import { PostModel } from "../../../../../modules/posts/persistence/mongo/model";
import { SeasonModel } from "../../../../../modules/seasons/persistence/mongo/model";
import { SeasonSeed } from "../../../../../modules/seasons/persistence/mongo/seed";
import { StaffModel } from "../../../../../modules/staff/persistence/mongo/model";
import { StaffSeed } from "../../../../../modules/staff/persistence/mongo/seed";
import { TeamModel } from "../../../../../modules/teams/persistence/mongo/model";
import { TeamSeed } from "../../../../../modules/teams/persistence/mongo/seed";
import { UserModel } from "../../../../../modules/users/persistence/mongo/model";

export async function seed() {
  await Promise.all([
    ClubModel.deleteMany(),
    TeamModel.deleteMany(),
    UserModel.deleteMany(),
    PostModel.deleteMany(),
    StaffModel.deleteMany(),
    PlayerModel.deleteMany(),
    SeasonModel.deleteMany(),
    PlayerHistoryModel.deleteMany(),
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
  await PlayerHistoryModel.create(histories);

  // CREATE USER
  //const user: User = UserSeed();
  //const newUser = await UserModel.create(user);

  // CREATE POST
  // const post: Post = PostSeed(newUser._id);
  // await PostModel.create(post);
}
