import { httpStatusCode } from "../enums/http-status-codes";
import { BaseError } from "./base-error";

//An error for all cases
export class GeneralError extends BaseError {
  public statusCode: number;
  public reason: string;

  constructor(message: string) {
    super(message);
    this.reason = message;
    this.statusCode = httpStatusCode.INTERNAL_ERROR;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, GeneralError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
