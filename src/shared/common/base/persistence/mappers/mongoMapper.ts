import { Base } from "../../domain";
import { DatabaseMapper, MongoBase } from "./types";

export abstract class BaseMongoMapper<
  Domain extends Base,
  DbEntity extends MongoBase
> implements DatabaseMapper<Domain, DbEntity>
{
  abstract toDomain(dbEntity: DbEntity): Domain;
  abstract toDatabase(domainEntity: Domain): Partial<DbEntity>;
  abstract toCreateDatabase(domainEntity: Partial<Domain>): Partial<DbEntity>;
  abstract toUpdateDatabase(domainEntity: Partial<Domain>): Partial<DbEntity>;
}

/**
 * Mapper generico per MongoDB che funziona con qualsiasi entità
 * Elimina la necessità di creare mapper specifici per ogni entità
 */
export class GenericMongoMapper<Domain extends Base>
  implements DatabaseMapper<Domain, Omit<Domain, keyof Base> & MongoBase>
{
  private readonly excludedFieldsFromMapping = [
    "id",
    "createdAt",
    "updatedAt",
  ] as const;
  private readonly baseFields = [
    "locked",
    "lockedAt",
    "createdAt",
    "updatedAt",
  ] as const;

  toDomain(dbEntity: Omit<Domain, keyof Base> & MongoBase): Domain {
    const domain = {
      ...dbEntity,
      id: dbEntity._id, // Converti _id MongoDB in id del domain
    } as unknown as Domain;

    // Rimuovi il campo _id dal risultato finale
    delete (domain as any)._id;

    return domain;
  }

  toDatabase(
    domainEntity: Domain
  ): Partial<Omit<Domain, keyof Base> & MongoBase> {
    const dbEntity: any = { ...domainEntity };

    // Rimuovi i campi che non devono essere mappati nel database
    this.excludedFieldsFromMapping.forEach((field) => {
      delete dbEntity[field];
    });

    return dbEntity;
  }

  toCreateDatabase(
    domainEntity: Partial<Domain>
  ): Partial<Omit<Domain, keyof Base> & MongoBase> {
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
  ): Partial<Omit<Domain, keyof Base> & MongoBase> {
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
