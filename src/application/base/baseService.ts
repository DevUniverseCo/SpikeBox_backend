import { ObjectId } from "mongodb";
import { IBaseRepository } from "./baseRepository";

export class BaseService<Entity, CreateEntity> {
  constructor(
    protected readonly baseRepository: IBaseRepository<Entity, CreateEntity>
  ) {}

  async create(createEntity: CreateEntity): Promise<Entity> {
    return this.baseRepository.create(createEntity);
  }

  async findById(id: ObjectId): Promise<Entity | undefined> {
    return this.baseRepository.findById(id);
  }

  async findAll(): Promise<Entity[]> {
    return this.baseRepository.findAll();
  }

  async update(
    id: ObjectId,
    updateEntity: CreateEntity
  ): Promise<Entity | undefined> {
    return this.baseRepository.update(id, updateEntity);
  }

  async delete(id: ObjectId): Promise<boolean | undefined> {
    return await this.baseRepository.delete(id);
  }
}
