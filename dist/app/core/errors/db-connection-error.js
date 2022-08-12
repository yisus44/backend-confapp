"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const http_status_codes_1 = require("../enums/http-status-codes");
const base_error_1 = require("./base-error");
class DatabaseConnectionError extends base_error_1.BaseError {
    constructor() {
        super("Database connection error");
        this.reason = "Database connection error";
        this.statusCode = http_status_codes_1.httpStatusCode.INTERNAL_ERROR;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
//# sourceMappingURL=db-connection-error.js.map