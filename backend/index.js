import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/router/index.js';
import db from './src/config/bd.js' 

db()
const app = express();

app.use(bodyParser.json());
dotenv.config();

const PORT =  process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})


app.use("/api/v1", routes)
