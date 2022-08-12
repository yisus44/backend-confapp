"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusCode = void 0;
var httpStatusCode;
(function (httpStatusCode) {
    httpStatusCode[httpStatusCode["OK"] = 200] = "OK";
    httpStatusCode[httpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpStatusCode[httpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpStatusCode[httpStatusCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    httpStatusCode[httpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(httpStatusCode || (httpStatusCode = {}));
exports.httpStatusCode = httpStatusCode;
//# sourceMappingURL=http-status-codes.js.map