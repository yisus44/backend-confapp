import { Router } from "express";

import {
  createUser,
  deleteUser,
  findByIdUser,
  updateUser,
} from "./user.controller";

const userRouter = Router();

//sign up
userRouter.post("/users", createUser);
//delete user
userRouter.delete("/users/:id", deleteUser);

userRouter.put("/users/:id", updateUser);

userRouter.get("/users/:id", findByIdUser);

export { userRouter };
