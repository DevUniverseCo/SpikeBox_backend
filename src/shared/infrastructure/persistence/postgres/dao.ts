import { Kysely } from "kysely";
import { IBaseRepository } from "../../../common/base/repository";
import { Database } from "./database";

/**
 * DAO base astratto per PostgreSQL usando Kysely
 * Fornisce operazioni CRUD type-safe per tutte le tabelle
 */
export abstract class BasePostgresDao<Entity, CreateEntity>
  implements IBaseRepository<Entity, CreateEntity>
{
  constructor(
    protected readonly db: Kysely<Database>,
    protected readonly tableName: keyof Database
  ) {}

  /**
   * Crea una nuova entità
   */
  async create(createEntity: CreateEntity): Promise<Entity> {
    const insertData = {
      ...createEntity,
      locked: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Uso sql raw per semplicità
    const query = this.db
      .insertInto(this.tableName as any)
      .values(insertData as any)
      .returningAll();

    const result = await query.executeTakeFirstOrThrow();
    return this.mapToEntity(result);
  }

  /**
   * Crea multiple entità in batch
   */
  async createMany(createEntities: CreateEntity[]): Promise<Entity[]> {
    if (!createEntities.length) return [];

    const insertData = createEntities.map((entity) => ({
      ...entity,
      locked: false,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    const query = this.db
      .insertInto(this.tableName as any)
      .values(insertData as any[])
      .returningAll();

    const results = await query.execute();
    return results.map((result) => this.mapToEntity(result));
  }

  /**
   * Trova tutte le entità non locked
   */
  async findAll(): Promise<Entity[]> {
    const query = this.db
      .selectFrom(this.tableName as any)
      .selectAll()
      .where("locked" as any, "=", false);

    const results = await query.execute();
    return results.map((result) => this.mapToEntity(result));
  }

  /**
   * Trova entità per ID
   */
  async findById(id: string): Promise<Entity | undefined> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return undefined;

    const query = this.db
      .selectFrom(this.tableName as any)
      .selectAll()
      .where("id" as any, "=", numericId)
      .where("locked" as any, "=", false);

    const result = await query.executeTakeFirst();
    return result ? this.mapToEntity(result) : undefined;
  }

  /**
   * Aggiorna entità per ID
   */
  async update(
    id: string,
    updateEntity: CreateEntity
  ): Promise<Entity | undefined> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return undefined;

    const updateData = {
      ...updateEntity,
      updated_at: new Date(),
    };

    const query = this.db
      .updateTable(this.tableName as any)
      .set(updateData as any)
      .where("id" as any, "=", numericId)
      .where("locked" as any, "=", false)
      .returningAll();

    const result = await query.executeTakeFirst();
    return result ? this.mapToEntity(result) : undefined;
  }

  /**
   * Soft delete: marca come locked invece di eliminare fisicamente
   */
  async delete(id: string): Promise<Entity | undefined> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return undefined;

    const query = this.db
      .updateTable(this.tableName as any)
      .set({
        locked: true,
        locked_at: new Date(),
        updated_at: new Date(),
      } as any)
      .where("id" as any, "=", numericId)
      .where("locked" as any, "=", false)
      .returningAll();

    const result = await query.executeTakeFirst();
    return result ? this.mapToEntity(result) : undefined;
  }

  /**
   * Hard delete: elimina fisicamente l'entità (usare con cautela)
   */
  async hardDelete(id: string): Promise<Entity | undefined> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return undefined;

    const query = this.db
      .deleteFrom(this.tableName as any)
      .where("id" as any, "=", numericId)
      .returningAll();

    const result = await query.executeTakeFirst();
    return result ? this.mapToEntity(result) : undefined;
  }

  /**
   * Metodo astratto che ogni DAO concreto deve implementare
   * per mappare il risultato DB all'entità di dominio
   */
  protected abstract mapToEntity(dbResult: any): Entity;

  /**
   * Metodi di utilità per query personalizzate
   */
  protected getQueryBuilder() {
    return this.db.selectFrom(this.tableName as any);
  }

  protected get database() {
    return this.db;
  }
}
