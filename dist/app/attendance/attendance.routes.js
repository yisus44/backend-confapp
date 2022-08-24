"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conferenceAttendanceRouter = void 0;
const express_1 = require("express");
const attendance_controller_1 = require("./attendance.controller");
const conferenceAttendanceRouter = (0, express_1.Router)();
exports.conferenceAttendanceRouter = conferenceAttendanceRouter;
conferenceAttendanceRouter.post("/conf/att", attendance_controller_1.createConferenceAttendance);
conferenceAttendanceRouter.get("/conf/att/:id", attendance_controller_1.getConferenceAttendanceById);
conferenceAttendanceRouter.get("/conf/:conferenceId/att/usr/:userId", attendance_controller_1.getAttendanceByPayload);
conferenceAttendanceRouter.delete("/conf/:conferenceId/att/usr/:userId", attendance_controller_1.deletetAttendanceByPayload);
conferenceAttendanceRouter.delete("/conf/att/:id", attendance_controller_1.deleteConferenceAttendance);
//# sourceMappingURL=attendance.routes.js.map