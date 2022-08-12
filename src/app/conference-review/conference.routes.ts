import { Router } from "express";
import { createConferenceReview } from "./conference-review.controller";

const conferenceReview = Router();

conferenceReview.post("/conf/rev", createConferenceReview);

// conferenceReview.get("/conf", findAllConferences);
// conferenceReview.get("/conf/:id", findConferenceById);
// conferenceReview.patch("/conf/:id", createConference);

export { conferenceReview };
