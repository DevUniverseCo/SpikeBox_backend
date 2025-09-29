// Base types for database adapters

export type MongoBase = {
  _id: string;
  locked: boolean;
  lockedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PostgresBase = {
  id: number;
  locked: boolean;
  lockedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface DatabaseMapper<Domain, Database> {
  toDomain(dbEntity: Database): Domain;
  toDatabase(domainEntity: Domain): Partial<Database>; // per update
  toCreateDatabase(domainEntity: Partial<Domain>): Partial<Database>; // per create
  toUpdateDatabase(domainEntity: Partial<Domain>): Partial<Database>; // per update
}
