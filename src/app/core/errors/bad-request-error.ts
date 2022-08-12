import { httpStatusCode } from "../enums/http-status-codes";
import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  public statusCode: number;
  public reason: string;

  constructor() {
    super("Invalid input");
    this.reason = "Invalid input";
    this.statusCode = httpStatusCode.BAD_REQUEST;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
