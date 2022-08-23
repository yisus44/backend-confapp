import { validationResult } from "express-validator";
import { Response, Request } from "express";

import { errorHandler } from "../core/utils";
import { RequestBody } from "../core/types/index";
import { getConnection } from "typeorm";
import { RequestValidationError } from "../core/errors/request-validation-error";
import { ResponseDTO } from "../core/DTOs/generic-response";
import { httpStatusCode } from "../core/enums/http-status-codes";
import { NotFoundError } from "../core/errors/not-found-error";
import {
  createConferenceAttendance,
  getAttendanceById,
} from "./attendance.interfaces";

import { Conference } from "../conference/conference.model";

import { User } from "../user/user.model";
import { ConferenceAttendance } from "./attendance.model";

async function createConferenceAttendance(
  req: RequestBody<createConferenceAttendance>,
  res: Response
) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const repository = getConnection().getRepository(ConferenceAttendance);

    const conferenceAttendance = new ConferenceAttendance();
    const prevAttendance = await repository.find({
      where: {
        user: req.body.userId,
        conference: req.body.conferenceId,
      },
    });
    if (prevAttendance.length > 0) {
      const response = new ResponseDTO(
        prevAttendance[0],
        true,
        httpStatusCode.OK,
        null
      );
      return res.status(response.statusCode).send(response);
    }

    const conference = await getConnection()
      .getRepository(Conference)
      .findOne({ id: req.body.conferenceId });

    const user = await getConnection()
      .getRepository(User)
      .findOne({ id: req.body.userId });

    if (!conference) throw new NotFoundError();
    if (!user) throw new NotFoundError();

    conferenceAttendance.conference = conference;
    conferenceAttendance.user = user;
    const newReview = await repository.save(conferenceAttendance);

    const response = new ResponseDTO(
      { ...newReview },
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

async function getConferenceAttendanceById(req: Request, res: Response) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    const { id } = req.params;
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const repository = getConnection().getRepository(ConferenceAttendance);
    const prevAttendance = await repository.find({
      where: {
        id: id,
      },
    });
    if (prevAttendance.length > 0) {
      const response = new ResponseDTO(
        prevAttendance,
        true,
        httpStatusCode.OK,
        null
      );
      return res.status(response.statusCode).send(response);
    }
    throw new NotFoundError();
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

async function getAttendanceByPayload(req: Request, res: Response) {
  const errors = validationResult(req);
  try {
    const { userId, conferenceId } = req.params;
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const repository = getConnection().getRepository(ConferenceAttendance);
    const prevAttendance = await repository.find({
      where: {
        user: userId,
        conference: conferenceId,
      },
    });
    if (prevAttendance.length > 0) {
      const response = new ResponseDTO(
        prevAttendance,
        true,
        httpStatusCode.OK,
        null
      );
      return res.status(response.statusCode).send(response);
    }
    throw new NotFoundError();
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

async function deleteConferenceAttendance(req: Request, res: Response) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const repository = getConnection().getRepository(ConferenceAttendance);
    const { id } = req.params;
    const prevAttendance = await repository
      .createQueryBuilder()
      .delete()
      .from(ConferenceAttendance)
      .where("id=:id", { id })
      .execute();

    const response = new ResponseDTO(
      prevAttendance,
      true,
      httpStatusCode.OK,
      null
    );
    return res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

export {
  createConferenceAttendance,
  getConferenceAttendanceById,
  deleteConferenceAttendance,
  getAttendanceByPayload,
};
