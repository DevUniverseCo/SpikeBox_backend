import { IBaseRepository } from "../base/baseRepository";
import { CreateExperience, Experience } from "./model";

export interface IExperienceRepository
  extends IBaseRepository<Experience, CreateExperience> {
  findByPlayerId(playerId: string): Promise<Experience[]>;
}
