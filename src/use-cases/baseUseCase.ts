import { BaseRepository } from "../domain/common/ports/baseRepository";

export class BaseUseCase<T> {
  constructor(private readonly sharedRepository: BaseRepository<T>) {}

  async getById(id: string): Promise<T | null> {
    return this.sharedRepository.getById(id);
  }

  async getList(): Promise<T[] | null> {
    return this.sharedRepository.getList();
  }

  async create(entity: T): Promise<T> {
    return this.sharedRepository.insert(entity);
  }

  async update(entity: T): Promise<T> {
    return this.sharedRepository.update(entity);
  }

  async delete(id: string): Promise<boolean> {
    return this.sharedRepository.delete(id);
  }
}
