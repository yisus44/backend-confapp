import { validationResult } from "express-validator";
import { Response } from "express";
import { getConnection } from "typeorm";
import { RequestBody } from "../core/types";
import {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
} from "../core/errors";
import { User } from "../user/user.model";
import { compareHash, errorHandler, generateJWT } from "../core/utils";
import { ResponseDTO } from "../core/DTOs/generic-response";
import { httpStatusCode } from "../core/enums/http-status-codes";
import { signUpBody } from "./session.model";
async function signUp(req: RequestBody<signUpBody>, res: Response) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const repository = getConnection().getRepository(User);
    const userFound = await repository.findOne({ email });
    if (!userFound) {
      throw new NotFoundError();
    }
    const match = await compareHash(password, userFound.password);
    if (!match) {
      throw new BadRequestError();
    }
    const token = generateJWT(userFound.id);
    const response = new ResponseDTO(
      { ...userFound, token },
      true,
      httpStatusCode.OK,
      null
    );
    res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

export { signUp };
