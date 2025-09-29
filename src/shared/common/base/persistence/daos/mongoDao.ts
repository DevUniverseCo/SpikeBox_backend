import { Model, Types } from "mongoose";
import { IBaseRepository } from "../../repository";

export class BaseMongoDao<TEntity, TCreate, TUpdate>
  implements IBaseRepository<TEntity, TCreate, TUpdate>
{
  constructor(readonly model: Model<Document>) {}

  async create(entity: TCreate): Promise<TEntity> {
    const doc = await this.model.create({
      ...entity,
      locked: false,
    });
    return doc.toObject() as TEntity;
  }

  async createMany(entities: TCreate[]): Promise<TEntity[]> {
    if (!entities.length) return [];
    const docs = await this.model.insertMany(
      entities.map((e) => ({
        ...e,
        locked: false,
      })),
      { lean: true }
    );
    return docs as TEntity[];
  }

  async findAll(): Promise<TEntity[]> {
    const docs = await this.model.find().lean();
    return docs as TEntity[];
  }

  async findById(id: string): Promise<TEntity | undefined> {
    if (!Types.ObjectId.isValid(id)) return undefined;
    const doc = await this.model.findById(id).lean();
    return doc ? (doc as TEntity) : undefined;
  }

  async update(id: string, entity: TUpdate): Promise<TEntity | undefined> {
    if (!Types.ObjectId.isValid(id)) return undefined;
    const doc = await this.model
      .findByIdAndUpdate(id, { entity }, { new: true })
      .lean();
    return doc ? (doc as TEntity) : undefined;
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const doc = await this.model.findByIdAndDelete(id).lean();
    return !!doc;
  }
}

// Attivando { timestamps: true } nello schema mongoose
// createdAt e updatedAt vengono gestiti automaticamente da mongoose
// quindi non sono necessari metodi specifici per gestirli qui
// ma sono comunque definiti nell'interfaccia BaseEntity
