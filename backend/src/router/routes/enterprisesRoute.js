import express from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../../controllers/enterpriseController.js";
import {
  createEnterpriseValidate,
  updateEnterpriseValidate,
} from "../../validators/enterprise.validate.js";
import { handleValidatorErrors } from "../../middleware/validatorErrors.js";

const enterpriseRouter = express.Router();

enterpriseRouter.get("/", index);
enterpriseRouter.get("/:slug", show);
enterpriseRouter.post(
  "",
  createEnterpriseValidate,
  handleValidatorErrors,
  create
);
enterpriseRouter.put(
  "/:slug",
  updateEnterpriseValidate,
  handleValidatorErrors,
  update
);
enterpriseRouter.delete("/:slug", destroy);

export default enterpriseRouter;
