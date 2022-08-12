import { Request } from "express";

export interface createConferenceReviewBody extends Request {
  score: number;
  userId: number;
  conferenceId: number;
}
