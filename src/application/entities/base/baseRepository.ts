export interface IBaseRepository<Entity, CreateEntity> {
  create(entity: CreateEntity): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | undefined>;
  update(id: string, entity: CreateEntity): Promise<Entity | undefined>;
  delete(id: string): Promise<Entity | undefined>;
}
