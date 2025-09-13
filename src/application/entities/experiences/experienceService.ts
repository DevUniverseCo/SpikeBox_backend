import { ObjectId } from "mongodb";
import { BaseService } from "../base/baseService";
import { IPlayerRepository } from "../players/playerRepository";
import { IExperienceRepository } from "./experienceRepository";
import { CreateExperience, Experience } from "./model";

export class ExperienceService extends BaseService<
  Experience,
  CreateExperience
> {
  constructor(
    protected readonly playerRepository: IPlayerRepository,
    protected readonly experienceRepository: IExperienceRepository
  ) {
    super(experienceRepository);
  }

  async findByPlayerId(playerId: ObjectId): Promise<Experience[] | undefined> {
    const experiences = await this.experienceRepository.findByPlayerId(
      playerId
    );
    return experiences;
  }
}
