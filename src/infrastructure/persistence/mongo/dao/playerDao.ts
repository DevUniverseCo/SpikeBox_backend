import { Collection } from "mongodb";

import {
  CreatePlayer,
  Player,
  PlayerWithExperiences,
} from "../../../../application/core/players/model";
import { IPlayerRepository } from "../../../../application/core/players/playerRepository";
import { BaseDao } from "./baseDao";

export class PlayerDao
  extends BaseDao<Player, CreatePlayer>
  implements IPlayerRepository
{
  constructor(collection: Collection) {
    super(collection);
  }

  findByIdWithExperiences(id: string): Promise<PlayerWithExperiences> {
    throw new Error("Method not implemented.");
  }
}
