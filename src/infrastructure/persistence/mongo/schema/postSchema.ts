import { model, Schema } from "mongoose";
import { Post } from "../../../../application/entities/post";

export type PostDocument = Post & Document;

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    publishedAt: { type: Date },
    locked: { type: Boolean, default: false },
    lockedAt: { type: Date },
  },
  { timestamps: true } // createdAt e updatedAt automatici
);

export const PostModel = model<PostDocument>("Post", PostSchema);
