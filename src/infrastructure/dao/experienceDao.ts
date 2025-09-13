import { Collection, ObjectId } from "mongodb";
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

  async findByPlayerId(playerId: ObjectId): Promise<Experience[]> {
    const docs = await this.collection
      .find({ playerId: playerId.toHexString() })
      .toArray();
    return docs as Experience[];
  }
}
