import { Collection, Db, ObjectId } from "mongodb";
import { IClubRepository } from "../../application/clubs/clubRepository";
import { Club, CreateClub, UpdateClub } from "../../application/clubs/model";

export class ClubDao implements IClubRepository {
  private readonly collection: Collection<Club>;

  constructor(db: Db) {
    this.collection = db.collection<Club>("Clubs");
  }

  async create(Club: CreateClub): Promise<Club> {
    const now = new Date();

    const doc = {
      ...Club,
      locked: false,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.collection.insertOne(doc);

    return {
      ...doc,
      _id: result.insertedId,
    };
  }

  async findAll(): Promise<Club[]> {
    return await this.collection.find().toArray();
  }

  async findById(id: Club["_id"]): Promise<Club | undefined> {
    const doc = await this.collection.findOne({
      _id: new ObjectId(id),
    });
    return doc ?? undefined;
  }

  async update(id: Club["_id"], Club: UpdateClub): Promise<Club | undefined> {
    const existingClub = await this.collection.findOne({ _id: id });
    if (!existingClub) return undefined;

    const updatedDoc = {
      ...existingClub,
      ...Club,
      updatedAt: new Date(),
    };

    await this.collection.updateOne({ _id: id }, { $set: updatedDoc });
    return updatedDoc;
  }

  async delete(id: Club["_id"]): Promise<Club | undefined> {
    return (await this.collection.findOneAndDelete({ _id: id })) ?? undefined;
  }
}
