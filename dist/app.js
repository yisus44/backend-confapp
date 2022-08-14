"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const conference_routes_1 = require("./app/conference-review/conference.routes");
const conference_routes_2 = require("./app/conference/conference.routes");
const session_routes_1 = require("./app/session/session.routes");
const user_routes_1 = require("./app/user/user.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(user_routes_1.userRouter);
app.use(session_routes_1.sessionRouter);
app.use(conference_routes_2.conferenceRouter);
app.use(conference_routes_1.conferenceReview);
app.get("/", function (req, res) {
    res.send("Server up and running");
});
app.use(express_1.default.json());
//# sourceMappingURL=app.js.map