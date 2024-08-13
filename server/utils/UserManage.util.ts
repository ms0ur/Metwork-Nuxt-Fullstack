import User from "../interfaces/user.interface";
import { UserModel } from "../db/models/user.model";

/**
 * Nav:
 * 26:1 - CreateUser
 *
 */

/**
 * Creates a new user in the database.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} name - The user's first name.
 * @param {string} surname - The user's last name.
 * @param {string} username - The user's username.
 * @param {Date} birthdate - The user's birthdate.
 * @param {string} sex - The user's sex.
 * @param {string} city - The user's city.
 * @param {string} country - The user's country.
 * @return {User | null} The newly created user.
 */
export async function createUser(
  email: string,
  password: string,
  name: string,
  surname: string,
  username: string,
  birthdate: Date,
  sex: string,
  city: string,
  country: string
): Promise<User | null> {
  try {
    const user = await new UserModel({
      email,
      password,
      name,
      surname,
      username,
      birthdate,
      sex,
      city,
      country,
      description: "No description yet.",
      createdAt: new Date(),
      lastOnline: new Date(),
      isPrivate: false,
    });

    await user.save();
    return user;
  } catch (e) {
    console.error(
      "Detected error while operating with database: \n" +
        e +
        "\n" +
        "Called from createUser() in UserManage.util.ts"
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
