import { Base } from "../../../shared/common/base/domain";
import {
  DatabaseMapper,
  MongoBase,
  PostgresBase,
} from "../../../shared/common/base/persistence/types";
import { Achievement } from "../domain";

// MongoDB specific types
export type AchievementMongoDocument = Omit<Achievement, keyof Base> &
  MongoBase;

// PostgreSQL specific types
export type AchievementPostgresRow = Omit<Achievement, keyof Base> &
  PostgresBase;

// Mappers
export class AchievementMongoMapper
  implements DatabaseMapper<Achievement, AchievementMongoDocument>
{
  toCreateDatabase(
    domainEntity: Omit<
      Achievement,
      "id" | "lockedAt" | "createdAt" | "updatedAt"
    >
  ): Partial<AchievementMongoDocument> {
    throw new Error("Method not implemented.");
  }
  toDomain(dbEntity: AchievementMongoDocument): Achievement {
    return {
      id: dbEntity._id,
      name: dbEntity.name,
      description: dbEntity.description,
      achievedAt: dbEntity.achievedAt,
      seasonId: dbEntity.seasonId,
      playerId: dbEntity.playerId,
      teamId: dbEntity.teamId,
      staffId: dbEntity.staffId,
      locked: dbEntity.locked,
    };
  }

  toDatabase(
    domainEntity: Achievement
  ): Omit<AchievementMongoDocument, keyof MongoBase> {
    return {
      name: domainEntity.name,
      description: domainEntity.description,
      achievedAt: domainEntity.achievedAt,
      seasonId: domainEntity.seasonId,
      playerId: domainEntity.playerId,
      teamId: domainEntity.teamId,
      staffId: domainEntity.staffId,
    };
  }

  //   toCreateDatabase(
  //     domainEntity: Omit<User, "id" | "createdAt" | "updatedAt" | "lockedAt">
  //   ): Omit<UserMongoDocument, "_id" | "createdAt" | "updatedAt"> {
  //     return {
  //       username: domainEntity.username,
  //       email: domainEntity.email,
  //       password: domainEntity.password,
  //       role: domainEntity.role,
  //       imageUrl: domainEntity.imageUrl,
  //       locked: domainEntity.locked,
  //     };
  //   }
}

export class UserPostgresMapper
  implements DatabaseMapper<Achievement, AchievementPostgresRow>
{
  toCreateDatabase(
    domainEntity: Omit<
      Achievement,
      "id" | "lockedAt" | "createdAt" | "updatedAt"
    >
  ): Partial<AchievementPostgresRow> {
    throw new Error("Method not implemented.");
  }
  toDomain(dbEntity: AchievementPostgresRow): Achievement {
    return {
      id: dbEntity.id.toString(), // Convert number to string for domain consistency
      name: dbEntity.name,
      description: dbEntity.description,
      achievedAt: dbEntity.achievedAt,
      seasonId: dbEntity.seasonId,
      playerId: dbEntity.playerId,
      teamId: dbEntity.teamId,
      staffId: dbEntity.staffId,
      locked: dbEntity.locked,
      lockedAt: dbEntity.lockedAt,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
    };
  }

  toDatabase(domainEntity: Achievement): Partial<AchievementPostgresRow> {
    return {
      name: domainEntity.name,
      description: domainEntity.description,
      achievedAt: domainEntity.achievedAt,
      seasonId: domainEntity.seasonId,
      playerId: domainEntity.playerId,
      teamId: domainEntity.teamId,
      staffId: domainEntity.staffId,
    };
  }

  //   toCreateDatabase(
  //     domainEntity: Omit<User, "id" | "createdAt" | "updatedAt" | "lockedAt">
  //   ): Omit<UserPostgresRow, "id" | "created_at" | "updated_at"> {
  //     return {
  //       username: domainEntity.username,
  //       email: domainEntity.email,
  //       password: domainEntity.password,
  //       role: domainEntity.role,
  //       imageUrl: domainEntity.imageUrl,
  //       locked: domainEntity.locked,
  //       locked_at: undefined, // Will be set by database if needed
  //     };
  //   }
}
