import { createSocketToken } from "~/server/utils/SocketAuthentification.util";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  if (session) {
    const t = createSocketToken(session.user.id);

    return t;
  } else {
    return null;
  }
});
