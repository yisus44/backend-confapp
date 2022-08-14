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
exports.createConferenceReview = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../core/utils");
const typeorm_1 = require("typeorm");
const request_validation_error_1 = require("../core/errors/request-validation-error");
const generic_response_1 = require("../core/DTOs/generic-response");
const http_status_codes_1 = require("../core/enums/http-status-codes");
const not_found_error_1 = require("../core/errors/not-found-error");
const conference_review_model_1 = require("./conference-review.model");
const conference_model_1 = require("../conference/conference.model");
const user_model_1 = require("../user/user.model");
function createConferenceReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(req.body);
        try {
            if (!errors.isEmpty()) {
                throw new request_validation_error_1.RequestValidationError(errors.array());
            }
            const repository = (0, typeorm_1.getConnection)().getRepository(conference_review_model_1.ConferenceReview);
            const conferenceReview = new conference_review_model_1.ConferenceReview();
            conferenceReview.score = req.body.score;
            const prevReview = yield repository.find({
                where: {
                    user: req.body.userId,
                    conference: req.body.conferenceId,
                },
            });
            if (prevReview.length > 0) {
                const response = new generic_response_1.ResponseDTO(prevReview, true, http_status_codes_1.httpStatusCode.OK, null);
                return res.status(response.statusCode).send(response);
            }
            const conference = yield (0, typeorm_1.getConnection)()
                .getRepository(conference_model_1.Conference)
                .findOne({ id: req.body.conferenceId });
            const user = yield (0, typeorm_1.getConnection)()
                .getRepository(user_model_1.User)
                .findOne({ id: req.body.userId });
            if (!conference)
                throw new not_found_error_1.NotFoundError();
            if (!user)
                throw new not_found_error_1.NotFoundError();
            conferenceReview.conference = conference;
            conferenceReview.user = user;
            const newReview = yield repository.save(conferenceReview);
            const response = new generic_response_1.ResponseDTO(Object.assign({}, newReview), true, http_status_codes_1.httpStatusCode.OK, null);
            res.status(response.statusCode).send(response);
        }
        catch (error) {
            const response = (0, utils_1.errorHandler)(error);
            res.status(response.statusCode).send(response);
        }
    });
}
exports.createConferenceReview = createConferenceReview;
//# sourceMappingURL=conference-review.controller.js.map