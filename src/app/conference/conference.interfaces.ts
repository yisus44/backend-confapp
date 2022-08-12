import { Request } from "express";

export interface createConferenceBody extends Request {
  conferenceName: string;
  location: string;
  img?: string;
}
