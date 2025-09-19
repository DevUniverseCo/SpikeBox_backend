import { CreateSeason, Season } from "../domain/season";
import { IBaseRepository } from "./baseRepository";

export interface ISeasonRepository
  extends IBaseRepository<Season, CreateSeason> {
  findAllWithTeamsFilteredClubId(id: string): Promise<any>;
}
