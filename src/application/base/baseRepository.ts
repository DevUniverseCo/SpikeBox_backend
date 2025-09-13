export interface IBaseRepository<T, C, U> {
  create(createEntity: C): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: U): Promise<T | undefined>;
  update(id: U, createEntity: C): Promise<T | undefined>;
  delete(id: U): Promise<T | undefined>;
}
