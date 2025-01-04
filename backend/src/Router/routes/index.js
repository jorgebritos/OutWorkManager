import express from "express"
import userRouter from "./userRoute.js"
import authRouter from "./authRoute.js"
import enterprisesRouter from "./enterprisesRoute.js"
import cors from "cors"

const routes = express.Router();
routes.use(cors())

routes.use("/auth", authRouter)
routes.use("/user", userRouter)
routes.use("/enterprises", enterprisesRouter)
routes.use("/users", userRouter)

export default routes;