import { ObjectId } from "mongodb";
import { IBaseRepository } from "../base/baseRepository";
import { CreatePlayer, Player, PlayerWithExperiences } from "./model";

export interface IPlayerRepository
  extends IBaseRepository<Player, CreatePlayer> {
  findByIdWithExperiences(
    id: ObjectId
  ): Promise<PlayerWithExperiences | undefined>;
}
