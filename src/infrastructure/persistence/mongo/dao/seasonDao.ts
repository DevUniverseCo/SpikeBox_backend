import { Model } from "mongoose";
import { CreateSeason, Season } from "../../../../application/entities/season";
import { ISeasonRepository } from "../../../../application/ports/seasonRepository";
import { SeasonDocument } from "../schema/seasonSchema";
import { BaseDao } from "./baseDao";

export class SeasonDao
  extends BaseDao<Season, CreateSeason>
  implements ISeasonRepository
{
  constructor(model: Model<SeasonDocument>) {
    super(model);
  }
  async findAllWithTeamsFilteredClubId(clubId: string): Promise<Season[]> {
    const seasons = await this.model.find().populate({
      path: "teams",
      match: { club: clubId }, // filtra solo i team di quel club
    });

    return seasons.map((season) => season.toObject());
  }
}
