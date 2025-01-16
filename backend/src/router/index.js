import express from "express"
import userRouter from "./routes/userRoute.js"
import authRouter from "./routes/authRoute.js"
import enterprisesRouter from "./routes/enterprisesRoute.js"
import enterprisesDocumentsRouter from "./routes/enterpriseDocumentsRoute.js"
import jobRouter from './routes/jobRoute.js'
import {enterprise_not_found} from "../middleware/enterprise_not_found.js"

const routes = express.Router();

routes.use("/auth", authRouter)

routes.use("/enterprises", enterprisesRouter)
routes.use("/enterprises/:enterprise/documents", enterprise_not_found, enterprisesDocumentsRouter)

routes.use("/user", userRouter)
routes.use("/users", userRouter)
routes.use("/jobs" , jobRouter)

export default routes;
