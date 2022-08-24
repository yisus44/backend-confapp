"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdUser = exports.updateUser = exports.deleteUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../core/utils");
const typeorm_1 = require("typeorm");
const request_validation_error_1 = require("../core/errors/request-validation-error");
const user_model_1 = require("./user.model");
const generic_response_1 = require("../core/DTOs/generic-response");
const http_status_codes_1 = require("../core/enums/http-status-codes");
const not_found_error_1 = require("../core/errors/not-found-error");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(req.body);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const hashedPassword = yield (0, utils_1.generateHash)(req.body.password);
            req.body.password = hashedPassword;
            const repository = (0, typeorm_1.getConnection)().getRepository(user_model_1.User);
            const user = new user_model_1.User();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = req.body.password;
            user.email = req.body.email;
            user.isAdmin = false;
            const newUser = yield repository.save(user);
            const token = (0, utils_1.generateJWT)(newUser.id);
            const response = new generic_response_1.ResponseDTO(Object.assign(Object.assign({}, newUser), { token }), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const { id } = req.params;
            const repository = (0, typeorm_1.getConnection)().getRepository(user_model_1.User);
            //returns user before update
            const userToUpdate = yield repository.findOne(id);
            if (!userToUpdate) {
                throw new not_found_error_1.NotFoundError();
            }
            if (req.body.password) {
                const hashedPassword = yield (0, utils_1.generateHash)(req.body.password);
                req.body.password = hashedPassword;
            }
            yield repository.update(id, req.body);
            const updatedUser = yield repository.findOne(id);
            const response = new generic_response_1.ResponseDTO(Object.assign({}, updatedUser), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const { id } = req.params;
            const repository = (0, typeorm_1.getConnection)().getRepository(user_model_1.User);
            const userToDelete = yield repository.findOne(id);
            if (!userToDelete) {
                throw new not_found_error_1.NotFoundError();
            }
            yield repository.delete(id);
            const response = new generic_response_1.ResponseDTO(Object.assign({}, userToDelete), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.deleteUser = deleteUser;
function findByIdUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const { id } = req.params;
            const repository = (0, typeorm_1.getConnection)().getRepository(user_model_1.User);
            const userFound = yield repository.findOne(id);
            if (!userFound) {
                throw new not_found_error_1.NotFoundError();
            }
            const response = new generic_response_1.ResponseDTO(Object.assign({}, userFound), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.findByIdUser = findByIdUser;
//# sourceMappingURL=user.controller.js.map