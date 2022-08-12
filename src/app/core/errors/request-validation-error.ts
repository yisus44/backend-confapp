import { ValidationError } from "express-validator";
import { httpStatusCode } from "../enums/http-status-codes";

import { BaseError } from "./base-error";
//this is a special class, build only for work nicely with express validator
export class RequestValidationError extends BaseError {
  public statusCode: number;
  public reason: string;
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Invalid request parameters");
    this.reason = "Invalid request parameters";
    this.statusCode = httpStatusCode.BAD_REQUEST;
    this.errors = errors;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
