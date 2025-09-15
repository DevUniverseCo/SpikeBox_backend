import { IBaseRepository } from "../base/baseRepository";
import { CreateHistory, History } from "./model";

export interface IHistoryRepository
  extends IBaseRepository<History, CreateHistory> {
  findByPlayerId(playerId: string): Promise<History[]>;
}
