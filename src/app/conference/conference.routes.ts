import { Router } from "express";
import {
  createConference,
  deleteConference,
  findAllConferences,
  findConferenceById,
} from "./conference.controller";

const conferenceRouter = Router();

conferenceRouter.post("/conf", createConference);

conferenceRouter.get("/conf", findAllConferences);
conferenceRouter.get("/conf/:id", findConferenceById);
conferenceRouter.patch("/conf/:id", createConference);
conferenceRouter.delete("/conf/:id", deleteConference);
export { conferenceRouter };
