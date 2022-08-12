"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
class AuthError extends base_error_1.BaseError {
    constructor() {
        super("Not authorized");
        this.reason = "Not authorized";
        this.statusCode = http_status_codes_1.httpStatusCode.UNAUTHORIZED;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, AuthError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=auth-error.js.map