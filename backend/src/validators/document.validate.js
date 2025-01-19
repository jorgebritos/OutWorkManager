import { body } from "express-validator";

export const createDocumentValidate = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isString()
    .withMessage("El título debe ser una cadena de texto"),
  body("document").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("El documento es obligatorio");
    }
    if (!req.file.mimetype.includes("pdf")) {
      throw new Error("El documento debe ser un archivo PDF");
    }
    return true;
  }),
  body("expire")
    .notEmpty()
    .withMessage("La fecha de expiración es obligatoria")
    .isISO8601()
    .withMessage("Debe ser una fecha válida en formato ISO (YYYY-MM-DD HH:mm)")
    .custom((value) => {
      const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
      if (!regex.test(value)) {
        throw new Error("El formato debe ser 'YYYY-MM-DD HH:mm'");
      }
      return true;
    }),
  body("is_valid")
    .optional()
    .isBoolean()
    .withMessage("Debe ser un valor booleano"),
];

export const updateDocumentValidate = [
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser una cadena de texto"),
  body("document")
    .optional()
    .custom((value, { req }) => {
      if (!req.file) {
        return true;
      }

      if (!req.file.mimetype.includes("pdf")) {
        throw new Error("El documento debe ser un archivo PDF");
      }
      return true;
    }),
  body("expire")
    .optional()
    .isISO8601()
    .withMessage("Debe ser una fecha válida en formato ISO (YYYY-MM-DD HH:mm)")
    .custom((value) => {
      const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
      if (!regex.test(value)) {
        throw new Error("El formato debe ser 'YYYY-MM-DD HH:mm'");
      }
      return true;
    }),
  body("is_valid")
    .optional()
    .isBoolean()
    .withMessage("Debe ser un valor booleano"),
];
