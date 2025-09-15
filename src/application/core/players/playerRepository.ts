import { IBaseRepository } from "../base/baseRepository";
import { CreatePlayer, Player, PlayerWithExperiences } from "./model";

export interface IPlayerRepository
  extends IBaseRepository<Player, CreatePlayer> {
  findByIdWithExperiences(id: string): Promise<PlayerWithExperiences>;
}
