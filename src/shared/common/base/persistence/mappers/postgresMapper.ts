import { Base } from "../../domain";
import { DatabaseMapper, PostgresBase } from "./types";

export abstract class BasePostgresMapper<
  Domain extends Base,
  DbEntity extends PostgresBase
> implements DatabaseMapper<Domain, DbEntity>
{
  abstract toDomain(dbEntity: DbEntity): Domain;
  abstract toDatabase(domainEntity: Domain): Partial<DbEntity>;
  abstract toCreateDatabase(domainEntity: Partial<Domain>): Partial<DbEntity>;
  abstract toUpdateDatabase(domainEntity: Partial<Domain>): Partial<DbEntity>;
}

/**
 * Mapper generico per PostgreSQL che funziona con qualsiasi entità
 * Elimina la necessità di creare mapper specifici per ogni entità
 */
export class GenericPostgresMapper<Domain extends Base>
  implements DatabaseMapper<Domain, Omit<Domain, keyof Base> & PostgresBase>
{
  private readonly excludedFieldsFromMapping = [
    "id",
    "createdAt",
    "updatedAt",
  ] as const;

  toDomain(dbEntity: Omit<Domain, keyof Base> & PostgresBase): Domain {
    const domain = {
      ...dbEntity,
      id: dbEntity.id.toString(), // Converti number PostgreSQL in string del domain
    } as Domain;

    return domain;
  }

  toDatabase(
    domainEntity: Domain
  ): Partial<Omit<Domain, keyof Base> & PostgresBase> {
    const dbEntity: any = { ...domainEntity };

    // Rimuovi i campi che non devono essere mappati nel database
    this.excludedFieldsFromMapping.forEach((field) => {
      delete dbEntity[field];
    });

    return dbEntity;
  }

  toCreateDatabase(
    domainEntity: Partial<Domain>
  ): Partial<Omit<Domain, keyof Base> & PostgresBase> {
    const dbEntity: any = { ...domainEntity };

    // Rimuovi i campi gestiti automaticamente dal database
    this.excludedFieldsFromMapping.forEach((field) => {
      delete dbEntity[field];
    });

    // Imposta i valori di default
    if (dbEntity.locked === undefined) {
      dbEntity.locked = false;
    }

    return dbEntity;
  }

  toUpdateDatabase(
    domainEntity: Partial<Domain>
  ): Partial<Omit<Domain, keyof Base> & PostgresBase> {
    const update: any = {};

    // Mappa automaticamente tutti i campi eccetto quelli esclusi
    Object.keys(domainEntity).forEach((key) => {
      if (
        !this.excludedFieldsFromMapping.includes(key as any) &&
        domainEntity[key as keyof Domain] !== undefined
      ) {
        update[key] = domainEntity[key as keyof Domain];
      }
    });

    return update;
  }
}
