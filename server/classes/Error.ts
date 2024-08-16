import { ErrorKeys } from "../enums/Error.enum";

export default class BError {
  public error_key: ErrorKeys;
  public messageEN: string;
  public statusCode: number;

  constructor(error_key: ErrorKeys, messageEN: string, statusCode: number) {
    this.error_key = error_key;
    this.messageEN = messageEN;
    this.statusCode = statusCode;
  }

  /**
   * Prepares error data for frontend consumption.
   *
   * @return {object} An object containing error_key and messageEN.
   */
  public prepareToFrontend(): object {
    return {
      error_key: this.error_key,
      messageEN: this.messageEN,
    };
  }

  /**
   * DO NOT USE!
   *
   * @return only errors
   */
  public reportToDatabase() {
    // TODO
    throw new Error("Method not implemented.");
  }
}
