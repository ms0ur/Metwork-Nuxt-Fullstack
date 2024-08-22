import IPost from "../interfaces/post.interface";
import { PostModel } from "../db/models/post.model";

import BError from "../classes/Error";
import { ErrorKeys } from "../enums/Error.enum";

export async function createPost(newPost: IPost): Promise<IPost | BError> {
  if (!newPost) {
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }

  try {
    const post = await PostModel.create(newPost);
    return post;
  } catch (e) {
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

export async function deletePost(id: string): Promise<Boolean | BError> {
  try {
    if (id) {
      await PostModel.findByIdAndDelete(id);
      return true;
    } else return new BError(ErrorKeys.server, "Internal server error", 500);
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from deletePost() in PostManage.ts"
    );
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

export async function findPostById(id: string): Promise<IPost | BError> {
  try {
    if (id) {
      const post = await PostModel.findById(id);
      if (post === null) {
        return new BError(ErrorKeys.server, "Post not found", 404);
      }
      return post;
    } else return new BError(ErrorKeys.server, "Internal server error", 500);
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from findPostById() in PostManage.ts"
    );
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

export async function getLatestPosts(
  firstIndex?: number,
  returnNumber?: number
): Promise<IPost[] | BError> {
  if (!firstIndex) {
    firstIndex = 0;
  }

  if (!returnNumber) {
    returnNumber = 10;
  }

  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip(firstIndex)
      .limit(returnNumber);
    return posts;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from getLatestPostsByCreatedAt() in PostManage.ts"
    );
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

export async function getLatestPostsByUserID(
  userID: string,
  firstIndex?: number,
  returnNumber?: number
): Promise<IPost[] | BError> {
  if (!firstIndex) {
    firstIndex = 0;
  }

  if (!returnNumber) {
    returnNumber = 10;
  }

  try {
    const posts = await PostModel.find({ userID: userID })
      .sort({ createdAt: -1 })
      .skip(firstIndex)
      .limit(returnNumber);
    return posts;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from getLatestPostsByUserID() in PostManage.ts"
    );
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}
