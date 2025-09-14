import { ObjectId } from "mongodb";
import { NotFoundError } from "../../common/errors";
import { IBaseRepository } from "./baseRepository";

export class BaseService<Entity, CreateEntity> {
  constructor(
    protected readonly baseRepository: IBaseRepository<Entity, CreateEntity>
  ) {}

  async create(createEntity: CreateEntity): Promise<Entity> {
    return this.baseRepository.create(createEntity);
  }

  async findById(id: ObjectId): Promise<Entity | undefined> {
    const item = await this.baseRepository.findById(id);
    this.handleNotFound(item, id);
    return item;
  }

  async findAll(): Promise<Entity[]> {
    return await this.baseRepository.findAll();
  }

  async update(
    id: ObjectId,
    updateEntity: CreateEntity
  ): Promise<Entity | undefined> {
    const updatedItem = await this.baseRepository.update(id, updateEntity);
    this.handleNotFound(updatedItem, id);
    return updatedItem;
  }

  async delete(id: ObjectId): Promise<Entity | undefined> {
    const item = await this.baseRepository.delete(id);
    this.handleNotFound(item, id);
    return item;
  }

  private handleNotFound(entity: Entity | undefined, id: ObjectId): void {
    if (!entity) throw new NotFoundError(`Entity with id ${id} not found`);
  }
}
