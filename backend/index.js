import express from 'express';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/Router/routes/index.js';

const app = express();


//express.json
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use("/api/v1", routes)