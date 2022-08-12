import { BaseError } from "../errors";
export class ResponseDTO<T> {
  public data: T;
  public isSuccessfull: boolean;
  public statusCode: number;
  public errors: { message: string; field?: string }[];

  constructor(
    data: T,
    isSuccesfull: boolean,
    statusCode: number,
    errors: { message: string; field?: string }[]
  ) {
    this.data = data;
    this.isSuccessfull = isSuccesfull;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
