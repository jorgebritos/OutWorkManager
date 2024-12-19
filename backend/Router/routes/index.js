import express from "express"
import userRouter from "./userRoute.js"

const routes = express.Router();

routes.use("/user", userRouter)

export default routes;