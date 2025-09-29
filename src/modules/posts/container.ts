import { mongoDao } from "../../shared/common/base/persistence/daos/mongoDao";
import { BaseUseCase } from "../../shared/common/base/use-case";
import { CreatePost } from "./domain";
import { PostDocument, PostModel } from "./persistence/mongo/model";

// Singleton instances (simple to import across the app)
export const postDao = new mongoDao<PostDocument, CreatePost>(PostModel);
export const postService = new BaseUseCase(postDao);

// Optional: factory to get fresh instances (useful in tests)
export function createPostService() {
  const dao = new mongoDao<PostDocument, CreatePost>(PostModel);
  return new BaseUseCase(dao);
}
