import { httpStatusCode } from "../enums/http-status-codes";
import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
  public statusCode: number;
  public reason: string;

  constructor() {
    super("Database connection error");
    this.reason = "Database connection error";
    this.statusCode = httpStatusCode.INTERNAL_ERROR;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
