import express from "express";
import jobDocumentsRouter from "./jobDocumentRoute.js";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../../controllers/enterpriseJobController.js";
import { handleValidatorErrors } from "../../middleware/validatorErrors.js";
import { job_not_found } from "../../middleware/job_not_found.js";
import {
  createJobValidate,
  updateJobValidate,
} from "../../validators/job.validate.js";
import {enterprise_job_not_found} from "../../middleware/enterprise_job_not_found.js";

const enterpriseJobRouter = express.Router({ mergeParams: true });

enterpriseJobRouter.get("/", index);
enterpriseJobRouter.post("/", createJobValidate, handleValidatorErrors, create);
enterpriseJobRouter.get("/:job", job_not_found, show);
enterpriseJobRouter.put(
  "/:job",
  job_not_found,
  updateJobValidate,
  handleValidatorErrors,
  update
);
enterpriseJobRouter.delete("/:job", job_not_found, destroy);

enterpriseJobRouter.use(
  "/:job/documents",
  enterprise_job_not_found,
  jobDocumentsRouter
);

export default enterpriseJobRouter;
