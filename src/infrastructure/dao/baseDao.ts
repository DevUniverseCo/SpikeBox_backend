import { Collection, ObjectId } from "mongodb";
import { IBaseRepository } from "../../application/core/base/baseRepository";

export class BaseDao<Entity, CreateEntity>
  implements IBaseRepository<Entity, CreateEntity>
{
  constructor(readonly collection: Collection) {}

  async create(createEntity: CreateEntity): Promise<Entity> {
    const doc = {
      ...createEntity,
      locked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.collection.insertOne(doc);
    const insertedDoc = {
      ...doc,
      _id: result.insertedId.toHexString(),
    } as Entity;
    return insertedDoc;
  }

  async findAll(): Promise<Entity[]> {
    const docs = await this.collection.find().toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    })) as Entity[];
  }

  async findById(id: string): Promise<Entity | undefined> {
    const _id = new ObjectId(id);
    const doc = await this.collection.findOne({ _id });
    if (!doc) return undefined;
    return {
      ...doc,
      _id: doc._id.toString(),
    } as Entity;
  }

  //TODO : testare se mettendo un _id non esistenete doc sia null
  async update(id: string, entity: CreateEntity): Promise<Entity | undefined> {
    const _id = new ObjectId(id);
    const updatedDoc = { ...entity, updatedAt: new Date() } as Partial<Entity>;
    const doc = await this.collection.findOneAndUpdate(
      { _id },
      { $set: updatedDoc },
      { returnDocument: "after" }
    );
    if (!doc) return undefined;
    return doc as Entity;
  }

  //TODO : testare se mettendo un _id non esistenete doc sia null
  async delete(id: string): Promise<Entity | undefined> {
    const _id = new ObjectId(id);
    const doc = await this.collection.deleteOne({ _id });
    if (!doc) return undefined;
    return doc as Entity;
  }
}
