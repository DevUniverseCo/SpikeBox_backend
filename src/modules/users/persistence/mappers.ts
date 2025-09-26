import { Base } from "../../../shared/common/base/domain";
import {
  DatabaseMapper,
  MongoBase,
  PostgresBase,
} from "../../../shared/common/base/persistence/types";
import { User } from "../domain";

// MongoDB specific types
export type UserMongoDocument = Omit<User, keyof Base> & MongoBase;

// PostgreSQL specific types
export type UserPostgresRow = Omit<User, keyof Base> & PostgresBase;

// Mappers
export class UserMongoMapper
  implements DatabaseMapper<User, UserMongoDocument>
{
  toDomain(dbEntity: UserMongoDocument): User {
    return {
      id: dbEntity._id,
      username: dbEntity.username,
      email: dbEntity.email,
      password: dbEntity.password,
      role: dbEntity.role,
      imageUrl: dbEntity.imageUrl,
      locked: dbEntity.locked,
      lockedAt: dbEntity.lockedAt,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
    };
  }

  toDatabase(domainEntity: User): Omit<UserMongoDocument, keyof MongoBase> {
    return {
      username: domainEntity.username,
      email: domainEntity.email,
      password: domainEntity.password,
      role: domainEntity.role,
      imageUrl: domainEntity.imageUrl,
    };
  }

  toCreateDatabase(
    domainEntity: Omit<User, "id" | "createdAt" | "updatedAt" | "lockedAt">
  ): Omit<UserMongoDocument, "_id" | "createdAt" | "updatedAt"> {
    return {
      username: domainEntity.username,
      email: domainEntity.email,
      password: domainEntity.password,
      role: domainEntity.role,
      imageUrl: domainEntity.imageUrl,
      locked: domainEntity.locked,
    };
  }
}

export class UserPostgresMapper
  implements DatabaseMapper<User, UserPostgresRow>
{
  toDomain(dbEntity: UserPostgresRow): User {
    return {
      id: dbEntity.id.toString(), // Convert number to string for domain consistency
      username: dbEntity.username,
      email: dbEntity.email,
      password: dbEntity.password,
      role: dbEntity.role,
      imageUrl: dbEntity.imageUrl,
      locked: dbEntity.locked,
      lockedAt: dbEntity.lockedAt,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
    };
  }

  toDatabase(domainEntity: User): Partial<UserPostgresRow> {
    return {
      username: domainEntity.username,
      email: domainEntity.email,
      password: domainEntity.password,
      role: domainEntity.role,
      imageUrl: domainEntity.imageUrl,
    };
  }

  toCreateDatabase(
    domainEntity: Omit<User, "id" | "createdAt" | "updatedAt" | "lockedAt">
  ): Omit<UserPostgresRow, "id" | "created_at" | "updated_at"> {
    return {
      username: domainEntity.username,
      email: domainEntity.email,
      password: domainEntity.password,
      role: domainEntity.role,
      imageUrl: domainEntity.imageUrl,
      locked: domainEntity.locked,
      lockedAt: undefined, // Will be set by database if needed
    };
  }
}
