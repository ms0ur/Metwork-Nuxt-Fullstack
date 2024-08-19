export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.username || !body?.password) {
    setResponseStatus(event, 400, "errors.server");
    return {};
  }
  const user = await loginUser(body.username, body.password);
  if (!user && user != null) {
    setResponseStatus(event, 401, "errors.wrongPassword");
    return {};
  }
  if (user == null) {
    setResponseStatus(event, 500, "errors.server");
  }
  const uu = await getByUsername(body.username);
  if (!uu) {
    setResponseStatus(event, 500, "errors.server");
    return {};
  }
  if (!uu._id) {
    setResponseStatus(event, 500, "errors.server");
    return {};
  }
  await setUserSession(event, {
    user: {
      id: uu._id,
      email: uu.email,
      username: uu.username,
    },
    loggedInAt: new Date(),
    // Any extra fields
  });
  setResponseStatus(event, 200, "Authenticated");
  return { uu };
});
