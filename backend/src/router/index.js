import express from "express";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import enterprisesRouter from "./routes/enterprisesRoute.js";
import enterprisesDocumentsRouter from "./routes/enterpriseDocumentsRoute.js";
import operatorRouter from "./routes/operatorRoute.js";
import jobRouter from "./routes/jobRoute.js";
import { enterprise_not_found } from "../middleware/enterprise_not_found.js";
import { operator_not_found } from "../middleware/operator_not_found.js";
import operatorsDocumentsRouter from "./routes/operatorDocumentRoute.js";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/enterprises", enterprisesRouter);
routes.use(
  "/enterprises/:enterprise/documents",
  enterprise_not_found,
  enterprisesDocumentsRouter
);
routes.use(
  "/enterprises/:enterprise/operators",
  enterprise_not_found,
  operatorRouter
);
routes.use(
  "/enterprises/:enterprise/operators/:operator/documents",
  enterprise_not_found,
  operator_not_found,
  operatorsDocumentsRouter
);

routes.use("/users", userRouter);
routes.use("/jobs", jobRouter);

export default routes;
