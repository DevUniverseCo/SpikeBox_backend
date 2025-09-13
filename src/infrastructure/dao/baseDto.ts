import {
  Collection,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { IBaseRepository } from "../../application/base/baseRepository";

export class BaseDao<Entity, CreateEntity>
  implements IBaseRepository<Entity, CreateEntity>
{
  constructor(private readonly collection: Collection) {}

  async create(createEntity: CreateEntity): Promise<Entity> {
    const now = new Date();

    const doc = {
      ...createEntity,
      locked: false,
      createdAt: now,
      updatedAt: now,
    } as OptionalUnlessRequiredId<Entity>;

    const result = await this.collection.insertOne(doc);
    const insertedDoc = {
      ...doc,
      _id: result.insertedId,
    } as Entity;
    return insertedDoc;
  }

  async findAll(): Promise<Entity[]> {
    const docs = await this.collection.find().toArray();
    return docs as Entity[];
  }

  async findById(id: ObjectId): Promise<Entity | undefined> {
    const doc = (await this.collection.findOne({
      _id: id,
    })) as WithId<Entity>;
    return (doc as Entity) ?? undefined;
  }

  async update(
    id: ObjectId,
    entity: CreateEntity
  ): Promise<Entity | undefined> {
    const updatedDoc = { ...entity, updatedAt: new Date() } as Partial<Entity>;
    const doc = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: updatedDoc },
      { returnDocument: "after" }
    );
    return (doc as unknown as Entity) ?? undefined;
  }

  async delete(id: ObjectId | string): Promise<boolean> {
    const doc = await this.collection.deleteOne({
      _id: id,
    } as WithId<Entity>);
    return doc.deletedCount === 1;
  }
}
