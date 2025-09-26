import { IBaseRepository } from "../../shared/common/base/repository";
import { DatabaseConfigurationManager } from "../../shared/infrastructure/persistence/config";
import { CreateUser, User } from "./domain";
import { DatabaseType, UserRepositoryFactory } from "./persistence/factory";

// Configuration manager
const configManager = DatabaseConfigurationManager.getInstance();

// Factory instance
const repositoryFactory = new UserRepositoryFactory();

// Get repository based on configuration
function getUserRepository(): IBaseRepository<User, CreateUser> {
  const config = configManager.getConfig();
  const connectionOptions =
    config.type === "postgres"
      ? { pool: configManager.getPostgresPool() }
      : undefined;

  return repositoryFactory.createUserRepository(config.type, connectionOptions);
}

// New repository-based service
export const userRepository = getUserRepository();

// Factory function for tests or multiple instances
export function createUserRepository(
  dbType?: DatabaseType,
  connectionOptions?: any
) {
  const finalDbType = dbType || configManager.getDatabaseType();
  return repositoryFactory.createUserRepository(finalDbType, connectionOptions);
}
