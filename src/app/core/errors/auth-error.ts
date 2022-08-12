import { httpStatusCode } from "../enums/http-status-codes";
import { BaseError } from "./base-error";

export class AuthError extends BaseError {
  public statusCode: number;
  public reason: string;

  constructor() {
    super("Not authorized");
    this.reason = "Not authorized";
    this.statusCode = httpStatusCode.UNAUTHORIZED;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
