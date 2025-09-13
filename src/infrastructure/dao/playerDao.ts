import { Collection, ObjectId } from "mongodb";
import {
  CreatePlayer,
  Player,
  PlayerWithExperiences,
} from "../../application/entities/players/model";
import { IPlayerRepository } from "../../application/entities/players/playerRepository";
import { BaseDao } from "./baseDao";

export class PlayerDao
  extends BaseDao<Player, CreatePlayer>
  implements IPlayerRepository
{
  constructor(collection: Collection) {
    super(collection);
  }

  findByIdWithExperiences(
    id: ObjectId
  ): Promise<PlayerWithExperiences | undefined> {
    throw new Error("Method not implemented.");
  }
}
