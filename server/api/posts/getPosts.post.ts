import IPost from "../../interfaces/post.interface";
import BError from "../../classes/Error";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body?.method == "all") {
    let posts: IPost[] | BError;
    try {
      posts = await getLatestPosts(body?.firstIndex, body?.returnNumber);
    } catch (e) {
      console.error(e);
      setResponseStatus(event, 500, "errors.server");
      return {};
    }
    return posts;
  } else if (body?.method == "userID") {
    let posts: IPost[] | BError;
    try {
      posts = await getLatestPostsByUserID(
        body?.userID,
        body?.firstIndex,
        body?.returnNumber
      );
    } catch (e) {
      console.error(e);
      setResponseStatus(event, 500, "errors.server");
      return {};
    }
  }

  return {};
});
