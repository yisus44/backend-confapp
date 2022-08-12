"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
class BadRequestError extends base_error_1.BaseError {
    constructor() {
        super("Invalid input");
        this.reason = "Invalid input";
        this.statusCode = http_status_codes_1.httpStatusCode.BAD_REQUEST;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request-error.js.map