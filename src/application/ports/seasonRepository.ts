import { CreateSeason, Season } from "../entities/season";
import { IBaseRepository } from "./baseRepository";

export interface ISeasonRepository
  extends IBaseRepository<Season, CreateSeason> {
  findAllWithTeamsFilteredClubId(id: string): Promise<any>;
}
