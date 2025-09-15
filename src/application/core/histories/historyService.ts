import { BaseService } from "../base/baseService";
import { IPlayerRepository } from "../players/playerRepository";
import { IHistoryRepository } from "./historyRepository";
import { CreateHistory, History } from "./model";

export class HistoryService extends BaseService<History, CreateHistory> {
  constructor(
    protected readonly playerRepository: IPlayerRepository,
    protected readonly historyRepository: IHistoryRepository
  ) {
    super(historyRepository);
  }

  async findByPlayerId(playerId: string): Promise<History[]> {
    return await this.historyRepository.findByPlayerId(playerId);
  }
}
