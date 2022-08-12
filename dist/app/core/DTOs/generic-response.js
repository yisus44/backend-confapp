"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDTO = void 0;
class ResponseDTO {
    constructor(data, isSuccesfull, statusCode, errors) {
        this.data = data;
        this.isSuccessfull = isSuccesfull;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.ResponseDTO = ResponseDTO;
//# sourceMappingURL=generic-response.js.map