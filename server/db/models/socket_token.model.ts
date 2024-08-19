import { defineMongooseModel } from "#nuxt/mongoose";
import SocketToken from "~/server/interfaces/socket_token.interface";

export const SocketTokenModel = defineMongooseModel<SocketToken>(
  "SocketToken",
  {
    token: {
      type: "string",
      required: true,
    },
    userID: {
      type: "string",
      required: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
  }
);
