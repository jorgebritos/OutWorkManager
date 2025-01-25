import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/router/index.js";
import connect_db from "./src/config/bd.js";
import morgan from "morgan";

connect_db();

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = process.env.PORT;
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.use("/api/v1", routes);
