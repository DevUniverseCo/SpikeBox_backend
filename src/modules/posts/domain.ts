import { Types } from "mongoose";
import { Base } from "../../shared/common/base/domain";

export type CreatePost = {
  title: string;
  content?: string;
  image?: string;
  author: Types.ObjectId;
  tags?: string[];
  publishedAt?: Date;
};

export type Post = Base & CreatePost;
export type UpdatePost = Partial<CreatePost>;
