import {
  Collection,
  Db,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { BaseRepository } from "../../../../domain/common/ports/baseRepository";

type Mapper<T, D> = {
  toPersistence(entity: T): D;
  toDomain(doc: WithId<D>): T;
};

export class MongoAdapter<
  T,
  D extends {
    _id?: ObjectId;
    locked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
> implements BaseRepository<T>
{
  private readonly collection: Collection<D>;

  constructor(
    db: Db,
    collectionName: string,
    private readonly mapper: Mapper<T, D>
  ) {
    this.collection = db.collection<D>(collectionName);
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.collection.findOne({
      _id: new ObjectId(id),
    } as Filter<D>);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async getList(): Promise<T[] | null> {
    const docs = await this.collection.find().toArray();
    return docs.map(this.mapper.toDomain);
  }

  async insert(entity: T): Promise<T> {
    const persistence = this.mapper.toPersistence(entity);
    const now = new Date();

    const doc = {
      ...persistence,
      locked: false,
      createdAt: now,
      updatedAt: now,
    } as unknown as OptionalUnlessRequiredId<D>;

    const result = await this.collection.insertOne(doc);
    const insertedDoc = {
      ...doc,
      _id: result.insertedId,
    } as unknown as WithId<D>;

    return this.mapper.toDomain(insertedDoc);
  }

  async update(entity: T & { id?: string }): Promise<T> {
    if (!entity.id) throw new Error("Entity must have id to update");
    const _id = new ObjectId(entity.id);
    const persistence = this.mapper.toPersistence(entity);
    const updatedDoc = { ...persistence, updatedAt: new Date() } as D;
    await this.collection.updateOne({ _id } as Filter<D>, { $set: updatedDoc });
    return this.mapper.toDomain({ ...updatedDoc, _id } as WithId<D>);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({
      _id: new ObjectId(id),
    } as Filter<D>);
    return result.deletedCount === 1;
  }
}
