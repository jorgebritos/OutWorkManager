import express from "express";
import { login, register } from "../../controllers/authController.js";
import {
  loginValidate,
  registerValidate,
} from "../../validators/auth.validate.js";
import { handleValidatorErrors } from "../../middleware/validatorErrors.js";

const userRouter = express.Router();

userRouter.post("/login", loginValidate, handleValidatorErrors, login);
userRouter.post("/register", registerValidate, handleValidatorErrors, register);

export default userRouter;
