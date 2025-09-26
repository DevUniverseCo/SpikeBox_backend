import { Pool } from "pg";
import { IBaseRepository } from "../../../shared/common/base/repository";
import { CreateUser, User } from "../domain";
import { UserMongoRepository } from "./mongo/repository";
import { UserPostgresRepository } from "./postgres/repository";

export type DatabaseType = "mongo" | "postgres";

export interface RepositoryFactory {
  createUserRepository(
    dbType: DatabaseType,
    connectionOptions?: any
  ): IBaseRepository<User, CreateUser>;
}

export class UserRepositoryFactory implements RepositoryFactory {
  createUserRepository(
    dbType: DatabaseType,
    connectionOptions?: any
  ): IBaseRepository<User, CreateUser> {
    switch (dbType) {
      case "mongo":
        return new UserMongoRepository();
      case "postgres":
        if (!connectionOptions || !connectionOptions.pool) {
          throw new Error("PostgreSQL pool connection required");
        }
        return new UserPostgresRepository(connectionOptions.pool as Pool);
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }
}
