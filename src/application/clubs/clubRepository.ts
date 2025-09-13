import { Club, CreateClub, UpdateClub } from "./model";

export interface IClubRepository {
  create(Club: CreateClub): Promise<Club>;
  findAll(): Promise<Club[]>;
  findById(id: Club["_id"]): Promise<Club | undefined>;
  update(id: Club["_id"], Club: UpdateClub): Promise<Club | undefined>;
  delete(id: Club["_id"]): Promise<Club | undefined>;
}
