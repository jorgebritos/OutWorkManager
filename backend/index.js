import express from 'express';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './Router/routes/index.js';

const app = express();


//express.json
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log("Server Running")
    })
}).catch((error) => console.error(error));

app.use("/api/v1", routes)