"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
//this is a special class, build only for work nicely with express validator
class RequestValidationError extends base_error_1.BaseError {
    constructor(errors) {
        super("Invalid request parameters");
        this.reason = "Invalid request parameters";
        this.statusCode = http_status_codes_1.httpStatusCode.BAD_REQUEST;
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
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation-error.js.map