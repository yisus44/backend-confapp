"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
//An error for all cases
class GeneralError extends base_error_1.BaseError {
    constructor(message) {
        super(message);
        this.reason = message;
        this.statusCode = http_status_codes_1.httpStatusCode.INTERNAL_ERROR;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, GeneralError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.GeneralError = GeneralError;
//# sourceMappingURL=general-error.js.map