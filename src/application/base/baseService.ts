import { ObjectId } from "mongodb";
import { IBaseRepository } from "./baseRepository";

export class BaseService<T extends { _id: ObjectId }, C> {
  constructor(
    protected readonly baseRepository: IBaseRepository<T, C, ObjectId>
  ) {}

  async create(createEntity: C): Promise<T> {
    return this.baseRepository.create(createEntity);
  }

  async findById(id: ObjectId): Promise<T | undefined> {
    return this.baseRepository.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this.baseRepository.findAll();
  }

  async update(id: T["_id"], updateEntity: C): Promise<T | undefined> {
    return this.baseRepository.update(id, updateEntity);
  }

  async delete(id: T["_id"]): Promise<T | undefined> {
    return await this.baseRepository.delete(id);
  }
}
