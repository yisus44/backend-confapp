import { validationResult } from "express-validator";
import { Response, Request } from "express";

import { errorHandler, generateHash, generateJWT } from "../core/utils";
import { RequestBody } from "../core/types/index";
import { createUserBody, updateUserBody } from "./user.interfaces";
import { getConnection } from "typeorm";
import { RequestValidationError } from "../core/errors/request-validation-error";
import { User } from "./user.model";
import { ResponseDTO } from "../core/DTOs/generic-response";
import { httpStatusCode } from "../core/enums/http-status-codes";
import { NotFoundError } from "../core/errors/not-found-error";

async function createUser(req: RequestBody<createUserBody>, res: Response) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const hashedPassword = await generateHash(req.body.password);
    req.body.password = hashedPassword;

    const repository = getConnection().getRepository(User);

    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    user.email = req.body.email;
    user.isAdmin = false;
    const newUser = await repository.save(user);

    const token = generateJWT(newUser.id);

    const response = new ResponseDTO(
      { ...newUser, token },
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

async function updateUser(req: RequestBody<updateUserBody>, res: Response) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);
    //returns user before update
    const userToUpdate = await repository.findOne(id);

    if (!userToUpdate) {
      throw new NotFoundError();
    }

    if (req.body.password) {
      const hashedPassword = await generateHash(req.body.password);
      req.body.password = hashedPassword;
    }

    await repository.update(id, req.body);
    const updatedUser = await repository.findOne(id);

    const response = new ResponseDTO(
      { ...updatedUser },
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

async function deleteUser(req: Request, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);

    const userToDelete = await repository.findOne(id);
    if (!userToDelete) {
      throw new NotFoundError();
    }
    await repository.delete(id);

    const response = new ResponseDTO(
      { ...userToDelete },
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

async function findByIdUser(req: Request, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);
    const userFound = await repository.findOne(id);
    if (!userFound) {
      throw new NotFoundError();
    }
    const response = new ResponseDTO(
      { ...userFound },
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

export { createUser, deleteUser, updateUser, findByIdUser };
