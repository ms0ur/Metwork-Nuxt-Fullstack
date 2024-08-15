import BError from "~/server/classes/Error";
import User from "~/server/interfaces/user.interface";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (
    !body?.email ||
    !body?.password ||
    !body?.name ||
    !body?.surname ||
    !body?.username ||
    !body?.birthdate ||
    !body?.sex ||
    !body?.city ||
    !body?.country ||
    !(body?.birthdate && new Date(body?.birthdate) instanceof Date)
  ) {
    setResponseStatus(event, 400, "Not enough arguments");
    return {};
  }
  let user: User;
  user = body;
  let newUser: User | BError;
  try {
    newUser = await createUser(user);
  } catch (e) {
    console.error(e);

    setResponseStatus(event, 500, "errors.server");
    return {};
  }
  if (newUser instanceof BError) {
    setResponseStatus(event, newUser.statusCode, newUser.error_key);
    return {};
  } else {
    setResponseStatus(event, 201, "success");
    return {};
  }
});
