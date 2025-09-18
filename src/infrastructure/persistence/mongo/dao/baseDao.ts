import { Model, Types } from "mongoose";
import { IBaseRepository } from "../../../../application/ports/baseRepository";

export class BaseDao<Entity, CreateEntity>
  implements IBaseRepository<Entity, CreateEntity>
{
  constructor(readonly model: Model<Entity & Document>) {}

  async create(createEntity: CreateEntity): Promise<Entity> {
    const doc = await this.model.create({
      ...createEntity,
      locked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return doc.toObject() as Entity;
  }

  async createMany(createEntities: CreateEntity[]): Promise<Entity[]> {
    if (!createEntities.length) return [];
    const docs = await this.model.insertMany(
      createEntities.map((e) => ({
        ...e,
        locked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { lean: true }
    );
    return docs as Entity[];
  }

  async findAll(): Promise<Entity[]> {
    const docs = await this.model.find().lean();
    return docs as Entity[];
  }

  async findById(id: string): Promise<Entity | undefined> {
    if (!Types.ObjectId.isValid(id)) return undefined;
    const doc = await this.model.findById(id).lean();
    return doc ? (doc as Entity) : undefined;
  }

  async update(id: string, entity: CreateEntity): Promise<Entity | undefined> {
    if (!Types.ObjectId.isValid(id)) return undefined;
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { ...entity, updatedAt: new Date() },
        { new: true }
      )
      .lean();
    return doc ? (doc as Entity) : undefined;
  }

  async delete(id: string): Promise<Entity | undefined> {
    if (!Types.ObjectId.isValid(id)) return undefined;
    const doc = await this.model.findByIdAndDelete(id).lean();
    return doc ? (doc as Entity) : undefined;
  }
}
