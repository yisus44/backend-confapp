"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
class NotFoundError extends base_error_1.BaseError {
    constructor() {
        super("Resource not found");
        this.reason = "Resource not found";
        this.statusCode = http_status_codes_1.httpStatusCode.NOT_FOUND;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map