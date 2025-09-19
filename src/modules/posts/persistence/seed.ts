import { Types } from "mongoose";
import { Post } from "../domain";

export const PostSeed = (userId: Types.ObjectId) => {
  const post: Post = {
    title: "Welcome to SpikeBox!",
    content: "This is the first post on SpikeBox. Stay tuned for more updates!",
    image: "https://example.com/welcome-image.jpg",
    author: userId,
    tags: ["welcome", "introduction"],
    publishedAt: new Date(),
    locked: false,
  };
  return post;
};
