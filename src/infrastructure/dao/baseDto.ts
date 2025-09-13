import {
  Collection,
  Db,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
} from "mongodb";
import { IBaseRepository } from "../../application/base/baseRepository";

export class BaseDao<T extends { _id: ObjectId }, C>
  implements IBaseRepository<T, C, ObjectId>
{
  private readonly collection: Collection<T>;

  constructor(db: Db, dbName: string) {
    this.collection = db.collection<T>(dbName);
  }

  async create(createEntity: C): Promise<T> {
    const now = new Date();

    const doc = {
      ...createEntity,
      locked: false,
      createdAt: now,
      updatedAt: now,
    } as OptionalUnlessRequiredId<T>;

    const result = await this.collection.insertOne(doc);
    const insertedDoc = {
      ...doc,
      _id: result.insertedId,
    } as T;
    return insertedDoc;
  }

  async findAll(): Promise<T[]> {
    const docs = await this.collection.find().toArray();
    return docs as T[];
  }

  async findById(id: T["_id"]): Promise<T | undefined> {
    const doc = await this.collection.findOne({
      _id: new ObjectId(id),
    } as Filter<T>);
    return (doc as T) ?? undefined;
  }

  async update(id: T["_id"], entity: C): Promise<T | undefined> {
    const _id = new ObjectId(id);
    const updatedDoc = { ...entity, updatedAt: new Date() } as Partial<T>;
    const doc = await this.collection.updateOne({ _id } as Filter<T>, {
      $set: updatedDoc,
    });
    return (doc as unknown as T) ?? undefined;
  }

  async delete(id: T["_id"]): Promise<T | undefined> {
    const doc = await this.collection.deleteOne({
      _id: new ObjectId(id),
    } as Filter<T>);
    return (doc as unknown as T) ?? undefined;
  }
}
