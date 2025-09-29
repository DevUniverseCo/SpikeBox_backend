export interface IBaseRepository<TEntity, TCreate, TUpdate> {
  create(entity: TCreate): Promise<TEntity>;
  createMany(entities: TCreate[]): Promise<TEntity[]>;
  findAll(): Promise<TEntity[]>;
  findById(id: string): Promise<TEntity | undefined>;
  update(id: string, entity: TUpdate): Promise<TEntity | undefined>;
  delete(id: string): Promise<boolean>;
}
