import ISocketToken from "../interfaces/socket_token.interface";
import User from "../interfaces/user.interface";
import BError from "../classes/Error";
import { SocketTokenModel } from "../db/models/socket_token.model";
import { ErrorKeys } from "../enums/Error.enum";
import { H3Event, EventHandlerRequest } from "h3";
import jwt from "jsonwebtoken";

export async function createSocketToken(
  id: string
): Promise<ISocketToken | BError> {
  if (!id) {
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }

  try {
    const user = getByID(id);
    if (!user) {
      return new BError(ErrorKeys.userNotFound, "User not found", 404);
    }

    const token = await SocketTokenModel.create({
      token: jwt.sign({ id }, "aboba"),
      // @ts-expect-error
      username: user.username,
      userID: id,
      issuedAt: new Date(),
    });

    return token;
  } catch (e) {
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

export async function checkTokenValid(token: string, userID: string) {
  try {
    const tokenData = jwt.verify(token, "aboba") as { id: string };
    if (tokenData.id !== userID) {
      return false;
    }
    const tok = SocketTokenModel.findOne({ token });
    if (!tok) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
