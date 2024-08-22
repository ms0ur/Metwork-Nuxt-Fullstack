import { defineMongooseModel } from "#nuxt/mongoose";
import IPost from "~/server/interfaces/post.interface";

export const PostModel = defineMongooseModel<IPost>("Post", {
  userID: "string",
  media: ["string"],
  comments: ["string"],
  likes: ["string"],
  reposts: ["string"],
  content: "string",
  createdAt: "Date",
  updatedAt: "Date",
});
