"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
//sign up
userRouter.post("/users", user_controller_1.createUser);
//delete user
userRouter.delete("/users/:id", user_controller_1.deleteUser);
userRouter.put("/users/:id", user_controller_1.updateUser);
userRouter.get("/users/:id", user_controller_1.findByIdUser);
//# sourceMappingURL=user.routes.js.map