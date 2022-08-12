import { Router } from "express";
import {
  createConference,
  findAllConferences,
  findConferenceById,
} from "./conference.controller";

const conferenceRouter = Router();

conferenceRouter.post("/conf", createConference);

conferenceRouter.get("/conf", findAllConferences);
conferenceRouter.get("/conf/:id", findConferenceById);
conferenceRouter.patch("/conf/:id", createConference);

export { conferenceRouter };
