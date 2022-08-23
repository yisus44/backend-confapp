import { Request } from "express";

export interface createConferenceAttendance extends Request {
  userId: number;
  conferenceId: number;
}
export interface getAttendanceById extends Request {
  conferenceAttendanceId: number;
}
