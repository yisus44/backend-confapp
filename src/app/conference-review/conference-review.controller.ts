import { validationResult } from "express-validator";
import { Response, Request } from "express";

import { errorHandler } from "../core/utils";
import { RequestBody } from "../core/types/index";
import { getConnection } from "typeorm";
import { RequestValidationError } from "../core/errors/request-validation-error";
import { ResponseDTO } from "../core/DTOs/generic-response";
import { httpStatusCode } from "../core/enums/http-status-codes";
import { NotFoundError } from "../core/errors/not-found-error";
import { ConferenceReview } from "./conference-review.model";
import { Conference } from "../conference/conference.model";
import { createConferenceReviewBody } from "./conference-review.interfaces";
import { User } from "../user/user.model";
async function createConferenceReview(
  req: RequestBody<createConferenceReviewBody>,
  res: Response
) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const repository = getConnection().getRepository(ConferenceReview);

    const conferenceReview = new ConferenceReview();
    conferenceReview.score = req.body.score;

    const prevReview = await repository.find({
      where: {
        user: req.body.userId,
        conference: req.body.conferenceId,
      },
    });
    if (prevReview.length > 0) {
      const response = new ResponseDTO(
        prevReview,
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

    conferenceReview.conference = conference;
    conferenceReview.user = user;
    const newReview = await repository.save(conferenceReview);

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

// async function findConferenceById(req: Request, res: Response) {
//   const errors = validationResult(req);
//   try {
//     if (!errors.isEmpty()) {
//       throw new RequestValidationError(errors.array());
//     }
//     const { id } = req.params;
//     const repository = getConnection().getRepository(Conference);
//     const conferenceFound = await repository.findOne(id);
//     if (!conferenceFound) {
//       throw new NotFoundError();
//     }
//     const response = new ResponseDTO(
//       { ...conferenceFound },
//       true,
//       httpStatusCode.OK,
//       null
//     );
//     res.status(response.statusCode).send(response);
//   } catch (error) {
//     const response = errorHandler(error);
//     res.status(response.statusCode).send(response);
//   }
// }

// async function findAllConferences(req: Request, res: Response) {
//   const errors = validationResult(req);
//   try {
//     if (!errors.isEmpty()) {
//       throw new RequestValidationError(errors.array());
//     }
//     const repository = getConnection().getRepository(Conference);
//     const conferencesFound = await repository.find({});
//     if (!conferencesFound) {
//       throw new NotFoundError();
//     }
//     const response = new ResponseDTO(
//       conferencesFound,
//       true,
//       httpStatusCode.OK,
//       null
//     );
//     res.status(response.statusCode).send(response);
//   } catch (error) {
//     const response = errorHandler(error);
//     res.status(response.statusCode).send(response);
//   }
// }

export { createConferenceReview };
