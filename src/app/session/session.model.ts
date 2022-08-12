import { Request } from "express";

export interface signUpBody extends Request {
  email: string;
  password: string;
}
