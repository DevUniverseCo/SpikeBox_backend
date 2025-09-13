import { ObjectId } from "mongodb";
import { BaseService } from "../base/baseService";
import { IExperienceRepository } from "../experiences/experienceRepository";
import { CreatePlayer, Player, PlayerWithExperiences } from "./model";
import { IPlayerRepository } from "./playerRepository";

export class PlayerService extends BaseService<Player, CreatePlayer> {
  constructor(
    protected readonly playerRepository: IPlayerRepository,
    protected readonly experienceRepository: IExperienceRepository
  ) {
    super(playerRepository);
  }

  async findByIdWithExperiences(
    id: ObjectId
  ): Promise<PlayerWithExperiences | undefined> {
    const player = await this.playerRepository.findById(id);
    if (!player) return undefined;
    const experiences = await this.experienceRepository.findByPlayerId(id);
    return { ...player, experiences };
  }
}
