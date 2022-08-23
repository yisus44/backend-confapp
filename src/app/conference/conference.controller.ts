import { validationResult } from "express-validator";
import { Response, Request } from "express";

import { errorHandler } from "../core/utils";
import { RequestBody } from "../core/types/index";
import { getConnection } from "typeorm";
import { RequestValidationError } from "../core/errors/request-validation-error";
import { ResponseDTO } from "../core/DTOs/generic-response";
import { httpStatusCode } from "../core/enums/http-status-codes";
import { NotFoundError } from "../core/errors/not-found-error";
import { createConferenceBody } from "./conference.interfaces";
import { Conference } from "./conference.model";

async function createConference(
  req: RequestBody<createConferenceBody>,
  res: Response
) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const repository = getConnection().getRepository(Conference);

    const conference = new Conference();
    conference.conferenceName = req.body.conferenceName;
    conference.location = req.body.location;
    conference.lat = req.body.lat;
    conference.long = req.body.long;
    conference.presenter = req.body.presenter;
    conference.date = req.body.date;
    if (req.body.img) {
      conference.img = req.body.img;
    }
    const newConference = await repository.save(conference);

    const response = new ResponseDTO(
      { ...newConference },
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

async function findConferenceById(req: Request, res: Response) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(Conference);
    // const conferenceFound = await repository.findOne(id);
    const conferenceFound = await repository
      .createQueryBuilder("conf")
      .where({ id })
      .leftJoinAndSelect("conf.reviews", "conferenceReviews")
      .leftJoinAndSelect("conf.attendance", "conferenceAttendace")
      .getOne();
    if (!conferenceFound) {
      throw new NotFoundError();
    }
    const response = new ResponseDTO(
      { ...conferenceFound },
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

async function findAllConferences(req: Request, res: Response) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const repository = getConnection().getRepository(Conference);
    const conferencesFound = await repository
      .createQueryBuilder("conf")
      .leftJoinAndSelect("conf.reviews", "conferenceReviews")
      .leftJoinAndSelect("conf.attendance", "conferenceAttendace")
      .getMany();
    if (!conferencesFound) {
      throw new NotFoundError();
    }
    const response = new ResponseDTO(
      conferencesFound,
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

export { createConference, findConferenceById, findAllConferences };
