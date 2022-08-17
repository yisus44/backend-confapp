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
exports.findAllConferences = exports.findConferenceById = exports.createConference = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../core/utils");
const typeorm_1 = require("typeorm");
const request_validation_error_1 = require("../core/errors/request-validation-error");
const generic_response_1 = require("../core/DTOs/generic-response");
const http_status_codes_1 = require("../core/enums/http-status-codes");
const not_found_error_1 = require("../core/errors/not-found-error");
const conference_model_1 = require("./conference.model");
function createConference(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(req.body);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const repository = (0, typeorm_1.getConnection)().getRepository(conference_model_1.Conference);
            const conference = new conference_model_1.Conference();
            conference.conferenceName = req.body.conferenceName;
            conference.location = req.body.location;
            conference.lat = req.body.lat;
            conference.long = req.body.long;
            conference.presenter = req.body.presenter;
            conference.date = req.body.date;
            if (req.body.img) {
                conference.img = req.body.img;
            }
            const newConference = yield repository.save(conference);
            const response = new generic_response_1.ResponseDTO(Object.assign({}, newConference), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.createConference = createConference;
function findConferenceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const { id } = req.params;
            const repository = (0, typeorm_1.getConnection)().getRepository(conference_model_1.Conference);
            // const conferenceFound = await repository.findOne(id);
            const conferenceFound = yield repository
                .createQueryBuilder("conf")
                .where({ id })
                .leftJoinAndSelect("conf.reviews", "conferenceReviews")
                .getOne();
            if (!conferenceFound) {
                throw new not_found_error_1.NotFoundError();
            }
            const response = new generic_response_1.ResponseDTO(Object.assign({}, conferenceFound), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.findConferenceById = findConferenceById;
function findAllConferences(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const repository = (0, typeorm_1.getConnection)().getRepository(conference_model_1.Conference);
            const conferencesFound = yield repository
                .createQueryBuilder("conf")
                .leftJoinAndSelect("conf.reviews", "conferenceReviews")
                .getMany();
            if (!conferencesFound) {
                throw new not_found_error_1.NotFoundError();
            }
            const response = new generic_response_1.ResponseDTO(conferencesFound, true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.findAllConferences = findAllConferences;
//# sourceMappingURL=conference.controller.js.map