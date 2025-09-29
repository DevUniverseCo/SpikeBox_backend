import { IBaseRepository } from "../../repository";

export class BasePostgresDao<TEntity, TCreate, TUpdate>
  implements IBaseRepository<TEntity, TCreate, TUpdate>
{
  constructor(private readonly dbClient: any, private readonly table: string) {}

  async create(entity: TCreate): Promise<TEntity> {
    const row = await this.dbClient.insert(this.table, entity);
    return row as TEntity;
  }

  async createMany(entities: TCreate[]): Promise<TEntity[]> {
    const rows = await this.dbClient.insertMany(this.table, entities);
    return rows as TEntity[];
  }

  async findAll(): Promise<TEntity[]> {
    const rows = await this.dbClient.selectAll(this.table);
    return rows as TEntity[];
  }

  async findById(id: string): Promise<TEntity | undefined> {
    const row = await this.dbClient.selectById(this.table, id);
    return row || undefined;
  }

  async update(id: string, entity: TUpdate): Promise<TEntity | undefined> {
    const row = await this.dbClient.updateById(this.table, id, entity);
    return row || undefined;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.dbClient.deleteById(this.table, id);
    return !!deleted;
  }
}

// TODO Qui puoi sostituire dbClient con il tuo ORM o query builder (Prisma, Knex, ecc.)
