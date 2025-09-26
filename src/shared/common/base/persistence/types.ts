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

// Generic mapper interface
export interface DatabaseMapper<DomainType, DatabaseType> {
  toDomain(dbEntity: DatabaseType): DomainType;
  toDatabase(domainEntity: DomainType): Partial<DatabaseType>;
  toCreateDatabase(
    domainEntity: Omit<
      DomainType,
      "id" | "createdAt" | "updatedAt" | "lockedAt"
    >
  ): Partial<DatabaseType>;
}
