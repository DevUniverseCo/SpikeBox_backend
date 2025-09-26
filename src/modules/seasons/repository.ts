import { IBaseRepository } from "../../shared/common/base/repository";
import { CreateSeason, Season } from "./domain";

export interface ISeasonRepository
  extends IBaseRepository<Season, CreateSeason> {
  findAllWithTeamsFilteredClubId(id: string): Promise<any>;
}
