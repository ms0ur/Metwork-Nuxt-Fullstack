import IPost from "../../interfaces/post.interface";
import BError from "../../classes/Error";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    setResponseStatus(event, 400, "Not enough arguments");
    return {};
  }
  let post: IPost | BError;
  try {
    post = await findPostById(body?.id);
  } catch (e) {
    console.error(e);
    setResponseStatus(event, 500, "errors.server");
    return {};
  }

  return post;
});
