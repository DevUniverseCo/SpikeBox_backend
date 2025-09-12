import { CreatePlayer, Player, UpdatePlayer } from "./model";

export interface IPlayerRepository {
  create(player: CreatePlayer): Promise<Player>;
  findAll(): Promise<Player[]>;
  findById(id: Player["_id"]): Promise<Player | undefined>;
  update(id: Player["_id"], player: UpdatePlayer): Promise<Player | undefined>;
  delete(id: Player["_id"]): Promise<Player | undefined>;
}
