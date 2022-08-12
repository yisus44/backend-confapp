import { httpStatusCode } from "../enums/http-status-codes";
import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  public statusCode: number;
  public reason: string;

  constructor() {
    super("Resource not found");
    this.reason = "Resource not found";
    this.statusCode = httpStatusCode.NOT_FOUND;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
