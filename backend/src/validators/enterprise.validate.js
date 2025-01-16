import { body } from "express-validator";
import User from "../Database/Esquemas/Usuario.js";
import Enterprise from "../Database/Esquemas/Empresa.js";

export const createEnterpriseValidate = [
  body("name")
    .isString()
    .withMessage("El campo 'nombre' debe ser una cadena de texto.")
    .notEmpty()
    .withMessage("El campo 'nombre' es obligatorio.")
    .custom(async (value) => {
      const exists = await Enterprise.findOne({ nombre: value });

      if (exists) {
        throw new Error("El 'nombre' ya existe en la base de datos.");
      }

      return true;
    }),
  body("is_valid")
    .isBoolean()
    .withMessage("El campo 'is_valid' debe ser un valor booleano.")
    .notEmpty()
    .withMessage("El campo 'is_valid' es obligatorio."),
  body("image")
    .optional()
    .custom((value, { req }) => {
      if (value === null) {
        return true;
      }

      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        throw new Error("El archivo debe ser una imagen.");
      }
      return true;
    }),
  body("user_id")
    .optional()
    .custom(async (value) => {
      const userExists = await User.findById(value);

      if (value === null) return true;

      if (!userExists) {
        throw new Error("El 'user_id' debe existir en la base de datos.");
      }
      return true;
    })
    .custom(async (value) => {
      const isUnique = await Enterprise.findOne({ user_id: value });

      if (value === null) return true;

      if (isUnique || value !== null) {
        throw new Error("El 'user_id' debe ser único en la tabla de empresas.");
      }
      return true;
    }),
];

export const updateEnterpriseValidate = [
  body("name")
    .optional()
    .isString()
    .withMessage("El campo 'nombre' debe ser una cadena de texto.")
    .custom(async (value) => {
      const exists = await Enterprise.findOne({ nombre: value });

      if (exists) {
        throw new Error("El 'nombre' ya existe en la base de datos.");
      }

      return true;
    }),
  body("is_valid")
    .optional()
    .isBoolean()
    .withMessage("El campo 'is_valid' debe ser un valor booleano."),
  body("image")
    .optional()
    .custom((value, { req }) => {
      if (value === null) {
        return true;
      }

      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        throw new Error("El archivo debe ser una imagen.");
      }
      return true;
    }),
  body("user_id")
    .optional()
    .custom(async (value) => {
      const userExists = await User.findById(value);

      if (value === null) return true;

      if (!userExists) {
        throw new Error("El 'user_id' debe existir en la base de datos.");
      }
      return true;
    })
    .custom(async (value) => {
      const isUnique = await Enterprise.findOne({ user_id: value });

      if (value === null) return true;

      if (isUnique || value !== null) {
        throw new Error("El 'user_id' debe ser único en la tabla de empresas.");
      }
      return true;
    }),
];
