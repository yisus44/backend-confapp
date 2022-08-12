"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const generic_response_1 = require("../DTOs/generic-response");
const base_error_1 = require("../errors/base-error");
const general_error_1 = require("../errors/general-error");
function errorHandler(error) {
    let response;
    if (error instanceof base_error_1.BaseError) {
        response = new generic_response_1.ResponseDTO(null, false, error.statusCode, error.serializeErrors());
    }
    else {
        const generalError = new general_error_1.GeneralError(error.message);
        response = new generic_response_1.ResponseDTO(null, false, generalError.statusCode, generalError.serializeErrors());
    }
    //console.log(response);
    return response;
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map