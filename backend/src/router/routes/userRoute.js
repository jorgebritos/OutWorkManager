import express from "express";
import {
  index,
  create,
  update,
  destroy,
} from "../../controllers/userController.js";
import { user_not_found } from "../../middleware/user_not_found.js";
import {
  createUserValidate,
  updateUserValidate,
} from "../../validators/user.validate.js";
import {handleValidatorErrors} from "../../middleware/validatorErrors.js";

const userRouter = express.Router();

userRouter.get("/", index);
userRouter.post("/", createUserValidate, handleValidatorErrors, create);
userRouter.put("/:user", user_not_found, updateUserValidate, handleValidatorErrors, update);
userRouter.delete("/:user", user_not_found, destroy);

export default userRouter;
