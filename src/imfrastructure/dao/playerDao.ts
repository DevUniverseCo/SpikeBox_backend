import { Collection, Db, ObjectId } from "mongodb";
import {
  CreatePlayer,
  Player,
  UpdatePlayer,
} from "../../application/players/model";
import { IPlayerRepository } from "../../application/players/playerRepository";

export class PlayerDao implements IPlayerRepository {
  private readonly collection: Collection<Player>;

  constructor(db: Db) {
    this.collection = db.collection<Player>("players");
  }

  async create(player: CreatePlayer): Promise<Player> {
    const now = new Date();

    const doc = {
      ...player,
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

  async findAll(): Promise<Player[]> {
    return await this.collection.find().toArray();
  }

  async findById(id: Player["_id"]): Promise<Player | undefined> {
    const doc = await this.collection.findOne({
      _id: new ObjectId(id),
    });
    return doc ?? undefined;
  }

  async update(
    id: Player["_id"],
    player: UpdatePlayer
  ): Promise<Player | undefined> {
    const existingPlayer = await this.collection.findOne({ _id: id });
    if (!existingPlayer) return undefined;

    const updatedDoc = {
      ...existingPlayer,
      ...player,
      updatedAt: new Date(),
    };

    await this.collection.updateOne({ _id: id }, { $set: updatedDoc });
    return updatedDoc;
  }

  async delete(id: Player["_id"]): Promise<Player | undefined> {
    return (await this.collection.findOneAndDelete({ _id: id })) ?? undefined;
  }
}
