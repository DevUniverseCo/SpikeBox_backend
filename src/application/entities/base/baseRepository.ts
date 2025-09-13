import { ObjectId } from "mongodb";

export interface IBaseRepository<Entity, CreateEntity> {
  create(entity: CreateEntity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: ObjectId): Promise<Entity | undefined>;
  update(id: ObjectId, entity: CreateEntity): Promise<Entity | undefined>;
  delete(id: ObjectId): Promise<boolean>;
}
