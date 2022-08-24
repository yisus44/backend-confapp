"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conferenceRouter = void 0;
const express_1 = require("express");
const conference_controller_1 = require("./conference.controller");
const conferenceRouter = (0, express_1.Router)();
exports.conferenceRouter = conferenceRouter;
conferenceRouter.post("/conf", conference_controller_1.createConference);
conferenceRouter.get("/conf", conference_controller_1.findAllConferences);
conferenceRouter.get("/conf/:id", conference_controller_1.findConferenceById);
conferenceRouter.patch("/conf/:id", conference_controller_1.createConference);
conferenceRouter.delete("/conf/:id", conference_controller_1.deleteConference);
//# sourceMappingURL=conference.routes.js.map