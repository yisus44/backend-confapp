import { Request } from "express";

export interface createUserBody extends Request {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface updateUserBody extends Request {
  password?: string;
  firstName?: string;
  lastName?: string;
}
