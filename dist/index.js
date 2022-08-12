"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require('./database/db');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./database/db");
const app_1 = require("./app");
const PORT = parseInt(process.env.PORT) || 3000;
app_1.app.listen(PORT, function () {
    console.log(`Server up and running in ${PORT}!`);
});
//# sourceMappingURL=index.js.map