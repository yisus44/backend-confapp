import { Router } from "express";
import { signUp } from "./session.controller";

const sessionRouter = Router();
//sign in
sessionRouter.post("/session", signUp);

export { sessionRouter };
