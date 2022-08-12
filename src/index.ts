//require('./database/db');
import dotenv from "dotenv";
dotenv.config();
import "./database/db";
import { app } from "./app";

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, function () {
  console.log(`Server up and running in ${PORT}!`);
});
