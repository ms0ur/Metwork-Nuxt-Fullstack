import User from "../interfaces/user.interface";
import BError from "../classes/Error";
import { UserModel } from "../db/models/user.model";
import { ErrorKeys } from "../enums/Error.enum";

import bcrypt from "bcrypt";

/**
 *
 * Creates a new user in the database.
 * @param {User} newuser - The user to create.
 * @return {User | null} The newly created user.
 */
export async function createUser(newuser: User): Promise<User | BError> {
  if (!newuser)
    return new BError(ErrorKeys.server, "Internal server error", 500);
  if (await getByEmail(newuser.email))
    return new BError(
      ErrorKeys.userEmailExists,
      "User with that email already exists",
      400
    );
  if (await getByUsername(newuser.username))
    return new BError(
      ErrorKeys.userUsernameExists,
      "User with that username already exists",
      400
    );
  try {
    const user = await new UserModel({
      email: newuser.email,
      password: await bcrypt.hash(newuser.password, 10),
      name: newuser.name,
      surname: newuser.surname,
      username: newuser.username,
      birthdate: newuser.birthdate,
      sex: newuser.sex,
      city: newuser.city,
      country: newuser.country,
      description: "No description yet.",
      createdAt: new Date(),
      lastOnline: new Date(),
      isPrivate: false,
    });

    await user.save();
    if (user) return user;
    else return new BError(ErrorKeys.server, "Internal server error", 500);
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from createUser() in UserManage.util.ts"
    );
    return new BError(ErrorKeys.server, "Internal server error", 500);
  }
}

/**
 * Attempts to log in a user by comparing the provided password with the stored hash.
 *
 * @param {string} username - The username of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @return {Boolean | null} True if the login is successful, false if the password is incorrect, or null if the user does not exist or an error occurs.
 */
export async function loginUser(
  username: string,
  password: string
): Promise<Boolean | null> {
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from loginUser() in UserManage.util.ts"
    );
    return null;
  }
}

export async function deleteUser(id: string): Promise<Boolean | null> {
  try {
    if (id) {
      await UserModel.findByIdAndDelete(id);
      return true;
    } else return false;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from deleteUser() in UserManage.util.ts"
    );
    return null;
  }
}

/**
 * Checks if a user exists in the database by their ID.
 *
 * @param {string} id - The ID of the user to check.
 * @return {Boolean | null} True if the user exists, false if not, or null if an error occurs.
 */
export async function isUserExist(id: string): Promise<Boolean | null> {
  try {
    const user = await UserModel.findById(id);
    if (user?.id == id) return true;
    else return false;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from isUserExist() in UserManage.util.ts"
    );
    return null;
  }
}

/**
 * Retrieves a user from the database by their ID.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @return {User | null} The user with the specified ID, or null if not found.
 */
export async function getByID(id: string): Promise<User | null> {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from getByID() in UserManage.util.ts"
    );
    return null;
  }
}

/**
 * Retrieves a user from the database by their username.
 *
 * @param {string} username - The username of the user to retrieve.
 * @return {User | null} The user with the specified username, or null if not found.
 */
export async function getByUsername(username: string): Promise<User | null> {
  try {
    const user = await UserModel.findOne({ username: username });
    return user;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from getByUsername() in UserManage.util.ts"
    );
    return null;
  }
}

/**
 * Retrieves a user from the database by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @return {User | null} The user with the specified email address, or null if not found.
 */
export async function getByEmail(email: string): Promise<User | null> {
  try {
    const user = await UserModel.findOne({ email: email });
    return user;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from getByEmail() in UserManage.util.ts"
    );
    return null;
  }
}

/**
 * Updates the last online date of a user in the database.
 *
 * @param {string} id - The ID of the user to update.
 * @return {Boolean | null} True if the update was successful, false if the user does not exist, or null if an error occurred.
 */
export async function updateLastOnline(id: string): Promise<Boolean | null> {
  try {
    if ((await isUserExist(id)) == true) {
      await UserModel.findByIdAndUpdate(id, { lastOnline: new Date() });
      return true;
    } else return false;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from updateLastOnline() in UserManage.util.ts"
    );
    return null;
  }
}

export async function updateUser(
  id: string,
  data: any
): Promise<Boolean | null> {
  try {
    if ((await isUserExist(id)) == true) {
      await UserModel.findByIdAndUpdate(id, data);
      return true;
    } else return false;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from updateUser() in UserManage.util.ts"
    );
    return null;
  }
}
