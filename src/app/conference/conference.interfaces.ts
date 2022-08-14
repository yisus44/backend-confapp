import { Request } from "express";

export interface createConferenceBody extends Request {
  conferenceName: string;
  location: string;
  presenter: string;
  lat: number;
  long: number;
  img?: string;
}
