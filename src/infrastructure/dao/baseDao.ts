import {
  Collection,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { IBaseRepository } from "../../application/entities/base/baseRepository";

export class BaseDao<Entity, CreateEntity>
  implements IBaseRepository<Entity, CreateEntity>
{
  constructor(readonly collection: Collection) {}

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
      _id: result.insertedId.toHexString(),
    } as Entity;
    return insertedDoc;
  }

  async findAll(): Promise<Entity[]> {
    return (await this.collection.find().toArray()) as Entity[];
  }

  async findById(id: string): Promise<Entity | undefined> {
    const doc = await this.collection.findOne({
      _id: new ObjectId(id),
    });
    return (doc as Entity) ?? undefined;
  }

  async update(id: string, entity: CreateEntity): Promise<Entity | undefined> {
    const updatedDoc = { ...entity, updatedAt: new Date() } as Partial<Entity>;
    const doc = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedDoc },
      { returnDocument: "after" }
    );
    return (doc as unknown as Entity) ?? undefined;
  }

  async delete(id: string): Promise<Entity | undefined> {
    const doc = await this.collection.deleteOne({
      _id: new ObjectId(id),
    } as WithId<Entity>);
    return (doc as Entity) ?? undefined;
  }
}
