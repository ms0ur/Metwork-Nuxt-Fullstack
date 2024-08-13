import { defineMongooseModel } from "#nuxt/mongoose";
import User from "~/server/interfaces/user.interface";

export const UserModel = defineMongooseModel<User>(
  "User",
  {
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    surname: {
      type: "string",
      required: true,
    },
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    sex: {
      type: "string",
      required: true,
    },
    city: {
      type: "string",
      required: true,
    },
    country: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    avatar: {
      type: "string",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    lastOnline: {
      type: Date,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  {},
  (schema) => {}
);
