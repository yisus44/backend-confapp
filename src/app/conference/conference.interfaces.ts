import { Request } from "express";

export interface createConferenceBody extends Request {
  conferenceName: string;
  location: string;
  lat: number;
  long: number;
  img?: string;
}
