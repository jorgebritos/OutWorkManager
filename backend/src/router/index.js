import express from "express";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import enterprisesRouter from "./routes/enterprisesRoute.js";
import enterprisesDocumentsRouter from "./routes/enterpriseDocumentsRoute.js";
import operatorRouter from "./routes/operatorRoute.js";
import jobRouter from "./routes/adminJobRoute.js";
import jobDocumentRouter from "./routes/jobDocumentRoute.js";
import { enterprise_not_found } from "../middleware/enterprise_not_found.js";
import { operator_not_found } from "../middleware/operator_not_found.js";
import operatorsDocumentsRouter from "./routes/operatorDocumentRoute.js";
import enterpriseJobRouter from "./routes/enterpriseJobRoute.js";
import isAuthenticate from "../middleware/isAuthenticate.js";

const routes = express.Router();

routes.use("/auth", authRouter);

routes.use("/enterprises", isAuthenticate, enterprisesRouter);

routes.use(
  "/enterprises/:enterprise/documents",
  isAuthenticate,
  enterprise_not_found,
  enterprisesDocumentsRouter
);

routes.use(
  "/enterprises/:enterprise/operators",
  isAuthenticate,
  enterprise_not_found,
  operatorRouter
);

routes.use(
  "/enterprises/:enterprise/operators/:operator/documents",
  isAuthenticate,
  enterprise_not_found,
  operator_not_found,
  operatorsDocumentsRouter
);

routes.use(
  "/enterprises/:enterprise/jobs",
  isAuthenticate,
  enterprise_not_found,
  enterpriseJobRouter
);

routes.use(
  "/users",
  isAuthenticate,
  userRouter
);

routes.use(
  "/jobs",
  isAuthenticate,
  jobRouter
);

routes.use(
  "/jobs/:job/documents",
  isAuthenticate,
  jobDocumentRouter
);

export default routes;
