import express from "express";
import { conferenceReview } from "./app/conference-review/conference.routes";
import { conferenceRouter } from "./app/conference/conference.routes";
import { sessionRouter } from "./app/session/session.routes";
import { userRouter } from "./app/user/user.routes";

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(sessionRouter);
app.use(conferenceRouter);
app.use(conferenceReview);
app.get("/", function (req, res) {
  res.send("Server up and running");
});

app.use(express.json());

export { app };
