import express from "express";
import {
  index,
  show,
  destroy,
  create,
  update,
} from "../../controllers/operatorController.js";
import { operator_not_found } from "../../middleware/operator_not_found.js";
import {
  createOperatorValidate,
  updateOperatorValidate,
} from "../../validators/operator.validate.js";
import { enterprise_not_found } from "../../middleware/enterprise_not_found.js";
import { handleValidatorErrors } from "../../middleware/validatorErrors.js";

const operatorRouter = express.Router({ mergeParams: true });

operatorRouter.get("/", enterprise_not_found, index);
operatorRouter.get(
  "/:operator",
  enterprise_not_found,
  operator_not_found,
  show
);
operatorRouter.post(
  "/",
  enterprise_not_found,
  createOperatorValidate,
  handleValidatorErrors,
  create
);
operatorRouter.put(
  "/:operator",
  enterprise_not_found,
  operator_not_found,
  updateOperatorValidate,
  handleValidatorErrors,
  update
);
operatorRouter.delete(
  "/:operator",
  enterprise_not_found,
  operator_not_found,
  destroy
);

export default operatorRouter;
