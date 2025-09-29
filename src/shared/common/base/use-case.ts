import { NotFoundError } from "../errors";
import { DatabaseMapper } from "./persistence/mappers/types";
import { IBaseRepository } from "./repository";

/**
 * Use case base unificato che funziona sia con MongoDB che con PostgreSQL
 * La distinzione tra i database viene gestita dai mapper e repository specifici
 */
export class BaseUseCase<
  Domain,
  DB,
  TCreate extends Partial<Domain> = Partial<Domain>,
  TUpdate extends Partial<Domain> = Partial<Domain>
> {
  constructor(
    protected readonly baseRepository: IBaseRepository<
      DB,
      Partial<DB>,
      Partial<DB>
    >,
    protected readonly mapper: DatabaseMapper<Domain, DB>
  ) {}

  async create(entity: TCreate): Promise<Domain> {
    const item = this.mapper.toCreateDatabase(entity);
    const dbEntity = await this.baseRepository.create(item);
    return this.mapper.toDomain(dbEntity);
  }

  async createMany(entities: TCreate[]): Promise<Domain[]> {
    const dbEntities = entities.map((entity) =>
      this.mapper.toCreateDatabase(entity)
    );
    const createdDbEntities = await this.baseRepository.createMany(dbEntities);
    return createdDbEntities.map((dbEntity) => this.mapper.toDomain(dbEntity));
  }

  async findById(id: string): Promise<Domain | undefined> {
    const item = await this.baseRepository.findById(id);
    if (!item) throw new NotFoundError(`Entity with id ${id} not found`);
    return this.mapper.toDomain(item);
  }

  async findAll(): Promise<Domain[]> {
    const items = await this.baseRepository.findAll();
    return items.map((item) => this.mapper.toDomain(item));
  }

  async update(id: string, entity: TUpdate): Promise<Domain | undefined> {
    const dbEntity = this.mapper.toUpdateDatabase(entity);
    const item = await this.baseRepository.update(id, dbEntity);
    if (!item) throw new NotFoundError(`Entity with id ${id} not found`);
    return this.mapper.toDomain(item);
  }

  async delete(id: string): Promise<boolean> {
    const item = await this.baseRepository.delete(id);
    if (!item) throw new NotFoundError(`Entity with id ${id} not found`);
    return item;
  }
}
