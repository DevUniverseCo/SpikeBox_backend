import { ObjectId } from "mongodb";
import { CreatePlayer, Player, UpdatePlayer } from "./model";
import { IPlayerRepository } from "./playerRepository";

export class PlayerService {
  constructor(protected readonly playerRepository: IPlayerRepository) {}

  async create(player: CreatePlayer): Promise<Player> {
    return this.playerRepository.create(player);
  }

  async getById(id: ObjectId): Promise<Player | undefined> {
    return this.playerRepository.findById(id);
  }

  async getList(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }

  async update(
    id: Player["_id"],
    player: UpdatePlayer
  ): Promise<Player | undefined> {
    return this.playerRepository.update(id, player);
  }

  async delete(id: Player["_id"]): Promise<Player | undefined> {
    return await this.playerRepository.delete(id);
  }
}
