"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conferenceReview = void 0;
const express_1 = require("express");
const conference_review_controller_1 = require("./conference-review.controller");
const conferenceReview = (0, express_1.Router)();
exports.conferenceReview = conferenceReview;
conferenceReview.post("/conf/rev", conference_review_controller_1.createConferenceReview);
//# sourceMappingURL=conference.routes.js.map