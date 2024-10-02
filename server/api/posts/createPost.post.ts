import IPost from "../../interfaces/post.interface";
import BError from "../../classes/Error";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.content || !body?.userID) {
    setResponseStatus(event, 400, "Not enough arguments");
    return {};
  }
  if (!(typeof body?.content === "string")) {
    setResponseStatus(event, 400, "Not enough arguments");
    return {};
  }
  let post: IPost;
  post = {
    media: JSON.parse(body?.media || '[""]'),
    userID: body?.userID,
    comments: [],
    likes: [],
    reposts: [],
    content: body?.content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let newPost: IPost | BError;
  try {
    newPost = await createPost(post);
  } catch (e) {
    console.error(e);
    setResponseStatus(event, 500, "errors.server");
    return {};
  }
  if (!newPost) {
    setResponseStatus(event, 500, "errors.server");
    return {};
  }
  return newPost;
});
