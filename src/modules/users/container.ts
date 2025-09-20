import { BaseDao } from "../../shared/common/base/persistence/dao";
import { BaseService } from "../../shared/common/base/use-case";
import { CreateUser } from "./domain";
import { UserDocument, UserModel } from "./persistence/model";

// Singleton instances (simple to import across the app)
export const userDao = new BaseDao<UserDocument, CreateUser>(UserModel);
export const userService = new BaseService(userDao);

// Optional: factory to get fresh instances (useful in tests)
export function createUserService() {
  const dao = new BaseDao<UserDocument, CreateUser>(UserModel);
  return new BaseService(dao);
}
