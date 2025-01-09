import express from "express"
import userRouter from "./routes/userRoute.js"
import authRouter from "./routes/authRoute.js"
import enterprisesRouter from "./routes/enterprisesRoute.js"
import jobRouter from './routes/jobRoute.js'
import cors from "cors"

const routes = express.Router();
routes.use(cors())

routes.use("/auth", authRouter)
routes.use("/user", userRouter)
routes.use("/enterprises", enterprisesRouter)
routes.use("/users", userRouter)
routes.use("/jobs" , jobRouter)

export default routes;