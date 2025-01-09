import express from 'express';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/Router/index.js';

const app = express();


//express.json
app.use(bodyParser.json());
dotenv.config();
const PORT =  process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})


app.use("/api/v1", routes)