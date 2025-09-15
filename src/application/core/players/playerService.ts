import { NotFoundError } from "../../common/errors";
import { BaseService } from "../base/baseService";
import { IHistoryRepository } from "../histories/historyRepository";
import { CreatePlayer, Player, PlayerWithExperiences } from "./model";
import { IPlayerRepository } from "./playerRepository";

export class PlayerService extends BaseService<Player, CreatePlayer> {
  constructor(
    protected readonly playerRepository: IPlayerRepository,
    protected readonly experienceRepository: IHistoryRepository
  ) {
    super(playerRepository);
  }

  async findByIdWithExperiences(id: string): Promise<PlayerWithExperiences> {
    const player = await this.playerRepository.findById(id);
    if (!player) throw new NotFoundError(`Player with id ${id} not found`);
    const experiences = await this.experienceRepository.findByPlayerId(id);
    return { ...player, experiences };
  }
}
