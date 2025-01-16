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
import { enterprise_not_found } from "../../middleware/enterprise_not_found.js";
import multer from "multer";

const upload = multer();

const enterpriseRouter = express.Router();

enterpriseRouter.get("/", index);
enterpriseRouter.get("/:enterprise", enterprise_not_found, show);
enterpriseRouter.post(
  "/",
  createEnterpriseValidate,
  handleValidatorErrors,
  create
);
enterpriseRouter.put(
  "/:enterprise",
  upload.single("image"),
  updateEnterpriseValidate,
  handleValidatorErrors,
  enterprise_not_found,
  update
);
enterpriseRouter.delete("/:enterprise", enterprise_not_found, destroy);

export default enterpriseRouter;
