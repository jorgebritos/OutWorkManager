import express from "express";
import { create, destroy, index, show, update } from "../../controllers/adminJobController.js";
import { handleValidatorErrors } from "../../middleware/validatorErrors.js";
import {job_not_found} from "../../middleware/job_not_found.js";
import {createJobValidate, updateJobValidate} from "../../validators/job.validate.js";

const jobRouter = express.Router();

jobRouter.get("/", index);
jobRouter.get("/:job", job_not_found, show);
jobRouter.post("/", createJobValidate, handleValidatorErrors, create);
jobRouter.put("/:job", updateJobValidate, handleValidatorErrors, job_not_found, update);
jobRouter.delete("/:job", job_not_found, destroy);

export default jobRouter;
