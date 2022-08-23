import { Router } from "express";
import {
  createConferenceAttendance,
  deleteConferenceAttendance,
  deletetAttendanceByPayload,
  getAttendanceByPayload,
  getConferenceAttendanceById,
} from "./attendance.controller";

const conferenceAttendanceRouter = Router();

conferenceAttendanceRouter.post("/conf/att", createConferenceAttendance);
conferenceAttendanceRouter.get("/conf/att/:id", getConferenceAttendanceById);
conferenceAttendanceRouter.get(
  "/conf/:conferenceId/att/usr/:userId",
  getAttendanceByPayload
);
conferenceAttendanceRouter.delete(
  "/conf/:conferenceId/att/usr/:userId",
  deletetAttendanceByPayload
);
conferenceAttendanceRouter.delete("/conf/att/:id", deleteConferenceAttendance);
// conferenceAttendanceRouter.get("/conf", findAllConferences);
// conferenceAttendanceRouter.get("/conf/:id", findConferenceById);
// conferenceAttendanceRouter.patch("/conf/:id", createConference);

export { conferenceAttendanceRouter };
