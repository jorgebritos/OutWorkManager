import { body } from "express-validator";
import User from "../database/Models/User.js";

export const createUserValidate = [
  body("image")
    .optional()
    .isString()
    .withMessage("La imagen debe ser un string"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El nombre no debe superar los 255 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El correo es requerido")
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .custom(async (email) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("El correo ya está en uso");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isString()
    .withMessage("La contraseña debe ser un string")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("rol")
    .notEmpty()
    .withMessage("El rol es requerido")
    .isString()
    .withMessage("El rol debe ser un string")
    .isIn(["Admin", "Enterprise", "Guard"])
    .withMessage(
      "El rol debe ser uno de los siguientes: Admin, Enterprise, Guard"
    ),
];

export const updateUserValidate = [
  body("image")
    .optional()
    .isString()
    .withMessage("La imagen debe ser un string"),
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El nombre no debe superar los 255 caracteres"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .custom(async (email) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("El correo ya está en uso");
      }
    }),
  body("password")
    .optional()
    .isString()
    .withMessage("La contraseña debe ser un string")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
   body("rol")
    .optional()
    .isString()
    .withMessage("El rol debe ser un string")
    .isIn(["Admin", "Enterprise", "Guard"])
    .withMessage(
      "El rol debe ser uno de los siguientes: Admin, Enterprise, Guard"
    ),
];
