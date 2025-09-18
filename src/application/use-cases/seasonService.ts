import { CreateSeason, Season } from "../entities/season";
import { ISeasonRepository } from "../ports/seasonRepository";
import { BaseService } from "./baseService";

export class SeasonService extends BaseService<Season, CreateSeason> {
  constructor(protected readonly seasonRepository: ISeasonRepository) {
    super(seasonRepository);
  }

  async findAllWithTeamsFilteredClubId(clubId: string): Promise<Season[]> {
    return await this.seasonRepository.findAllWithTeamsFilteredClubId(clubId);
  }
}
