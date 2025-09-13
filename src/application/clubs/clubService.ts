import { ObjectId } from "mongodb";
import { IClubRepository } from "./clubRepository";
import { Club, CreateClub, UpdateClub } from "./model";

export class ClubService {
  constructor(protected readonly ClubRepository: IClubRepository) {}

  async create(Club: CreateClub): Promise<Club> {
    return this.ClubRepository.create(Club);
  }

  async findById(id: ObjectId): Promise<Club | undefined> {
    return this.ClubRepository.findById(id);
  }

  async findAll(): Promise<Club[]> {
    return this.ClubRepository.findAll();
  }

  async update(id: Club["_id"], Club: UpdateClub): Promise<Club | undefined> {
    return this.ClubRepository.update(id, Club);
  }

  async delete(id: Club["_id"]): Promise<Club | undefined> {
    return await this.ClubRepository.delete(id);
  }
}
