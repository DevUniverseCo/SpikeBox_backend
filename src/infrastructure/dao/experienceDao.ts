import { Collection } from "mongodb";
import { IExperienceRepository } from "../../application/entities/experiences/experienceRepository";
import {
  CreateExperience,
  Experience,
} from "../../application/entities/experiences/model";
import { BaseDao } from "./baseDao";

export class ExperienceDao
  extends BaseDao<Experience, CreateExperience>
  implements IExperienceRepository
{
  constructor(collection: Collection) {
    super(collection);
  }

  async findByPlayerId(playerId: string): Promise<Experience[]> {
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
    })) as Experience[];
  }
}
