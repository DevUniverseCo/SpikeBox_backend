import { Collection } from "mongodb";
import { IHistoryRepository } from "../../application/core/histories/historyRepository";
import { CreateHistory, History } from "../../application/core/histories/model";
import { BaseDao } from "./baseDao";

export class HistoryDao
  extends BaseDao<History, CreateHistory>
  implements IHistoryRepository
{
  constructor(collection: Collection) {
    super(collection);
  }

  async findByPlayerId(playerId: string): Promise<History[]> {
    const docs = await this.collection.find({ playerId: playerId }).toArray();
    return docs.map((doc) => ({
      _id: doc._id.toString(),
      playerId: doc.playerId,
      locked: doc.locked,
      createdAt:
        doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
      updatedAt:
        doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
      // add other Experience fields if needed
    })) as History[];
  }
}
