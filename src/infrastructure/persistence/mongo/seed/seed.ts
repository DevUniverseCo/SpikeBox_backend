import { Achievement } from "../../../../application/domain/achievement";
import { History } from "../../../../application/domain/history";
import { Post } from "../../../../application/domain/post";
import { Staff } from "../../../../application/domain/staff";
import { User } from "../../../../application/domain/user";
import { AchievementModel } from "../schema/achievementSchema";
import { ClubModel } from "../schema/clubSchema";
import { HistoryModel } from "../schema/historySchema";
import { PlayerModel } from "../schema/playerSchema";
import { PostModel } from "../schema/postSchema";
import { SeasonModel } from "../schema/seasonSchema";
import { StaffModel } from "../schema/staffSchema";
import { TeamModel } from "../schema/teamSchema";
import { UserModel } from "../schema/userSchema";
import { AchievementSeed } from "./data/achievement";
import { ClubSeed } from "./data/club";
import { HistorySeed } from "./data/history";
import { PlayerSeed } from "./data/player";
import { PostSeed } from "./data/post";
import { SeasonSeed } from "./data/season";
import { StaffSeed } from "./data/staff";
import { TeamSeed } from "./data/team";
import { UserSeed } from "./data/user";

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

  // CREA STAGIONE
  const season = SeasonSeed();
  const newSeason = await SeasonModel.create(season);

  // CREA STAFF
  const staff: Staff = StaffSeed();
  const newStaff = await StaffModel.create(staff);

  // CREA TEAM
  const team = TeamSeed(newClub._id, newSeason._id, [newStaff._id]);
  const newTeam = await TeamModel.create(team);

  // CREA PLAYER
  const player = PlayerSeed();
  const newPlayer = await PlayerModel.create(player);

  // CREA ACHIEVEMENT
  const achievement: Achievement = AchievementSeed(
    newSeason._id,
    undefined,
    newTeam._id
  );
  await AchievementModel.create(achievement);

  // CREATE HISTORY
  const history: History = HistorySeed(
    newTeam._id,
    newPlayer._id,
    newSeason._id
  );
  await HistoryModel.create(history);

  // CREATE USER
  const user: User = UserSeed();
  const newUser = await UserModel.create(user);

  // CREATE POST
  const post: Post = PostSeed(newUser._id);
  await PostModel.create(post);
}
