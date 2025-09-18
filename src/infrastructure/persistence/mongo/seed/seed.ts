import { Types } from "mongoose";
import { Club } from "../../../../application/entities/club";
import { History } from "../../../../application/entities/history";
import { Player } from "../../../../application/entities/player";
import { Post } from "../../../../application/entities/post";
import { Season } from "../../../../application/entities/season";
import { Staff } from "../../../../application/entities/staff";
import { Team } from "../../../../application/entities/team";
import { User } from "../../../../application/entities/user";
import { AchievementModel } from "../schema/achievementSchema";
import { ClubModel } from "../schema/clubSchema";
import { HistoryModel } from "../schema/historySchema";
import { PlayerModel } from "../schema/playerSchema";
import { PostModel } from "../schema/postSchema";
import { SeasonModel } from "../schema/seasonSchema";
import { StaffModel } from "../schema/staffSchema";
import { TeamModel } from "../schema/teamSchema";
import { UserModel } from "../schema/userSchema";
import { ClubSeed } from "./data/club";
import { HistorySeed } from "./data/history";
import { PlayerSeed } from "./data/player";
import { PostSeed } from "./data/post";
import { SeasonSeed } from "./data/season";
import { StaffSeed } from "./data/staff";
import { TeamSeed } from "./data/team";
import { UserSeed } from "./data/user";

export async function seed() {
  await ClubModel.deleteMany();
  await SeasonModel.deleteMany();
  await StaffModel.deleteMany();
  await PlayerModel.deleteMany();
  await TeamModel.deleteMany();
  await AchievementModel.deleteMany();
  await HistoryModel.deleteMany();
  await UserModel.deleteMany();
  await PostModel.deleteMany();

  // seed CLUBS-TABLE
  const club: Club = ClubSeed();
  const newClubWithId: Types.ObjectId = (await ClubModel.insertOne(club))._id;

  // seed SEASONS-TABLE
  const season: Season = SeasonSeed();
  const newSeasonWithId: Types.ObjectId = (await SeasonModel.insertOne(season))
    ._id;

  // seed TEAMS-TABLE
  const team: Team = TeamSeed(newClubWithId, newSeasonWithId, [], [], []);
  const newTeamWithId: Types.ObjectId = (await TeamModel.insertOne(team))._id;

  // seed PLAYER-TABLE
  const player: Player = PlayerSeed();
  const newPlayerWithId: Types.ObjectId = (await PlayerModel.insertOne(player))
    ._id;

  // seed HISTORY-TABLE
  const history: History = HistorySeed(
    newTeamWithId,
    newPlayerWithId,
    newSeasonWithId
  );
  const newHistoryWithId: Types.ObjectId = (
    await HistoryModel.insertOne(history)
  )._id;

  // seed STAFF-TABLE
  const staff: Staff = StaffSeed();
  const newStaffWithId: Types.ObjectId = (await StaffModel.insertOne(staff))
    ._id;

  // seed USER-TABLE
  const user: User = UserSeed();
  const newUserWithId: Types.ObjectId = (await UserModel.insertOne(user))._id;

  // seed POST-TABLE
  const post: Post = PostSeed(newUserWithId);
  const newPostWithId: Types.ObjectId = (await PostModel.insertOne(post))._id;

  // update club
  await ClubModel.findByIdAndUpdate(
    newClubWithId,
    { $push: { teams: newTeamWithId } },
    { new: true } // opzionale, restituisce il documento aggiornato
  );

  // update season
  await SeasonModel.findByIdAndUpdate(
    newSeasonWithId,
    { $push: { teams: newTeamWithId } },
    { new: true } // opzionale, restituisce il documento aggiornato
  );

  // update player
  await PlayerModel.findByIdAndUpdate(
    newPlayerWithId,
    { $push: { histories: newHistoryWithId } },
    { new: true } // opzionale, restituisce il documento aggiornato
  );

  // update team
  await TeamModel.findByIdAndUpdate(
    newTeamWithId,
    { $push: { staff: newStaffWithId } },
    { new: true } // opzionale, restituisce il documento aggiornato
  );
  await TeamModel.findByIdAndUpdate(
    newTeamWithId,
    { $push: { roster: newPlayerWithId } },
    { new: true } // opzionale, restituisce il documento aggiornato
  );
}
