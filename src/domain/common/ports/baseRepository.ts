export interface BaseRepository<T> {
  getById(id: string): Promise<T | null>;
  getList(): Promise<T[] | null>;
  insert(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
