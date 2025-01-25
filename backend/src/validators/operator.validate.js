import { body } from 'express-validator'

export const createOperatorValidate = [
  body('ci')
    .notEmpty().withMessage('El campo ci es requerido')
    .isString().withMessage('El campo ci debe ser una cadena de texto')
    .isLength({ max: 44 }).withMessage('El campo ci no puede superar los 44 caracteres'),

  body('name')
    .notEmpty().withMessage('El campo name es requerido')
    .isString().withMessage('El campo name debe ser una cadena de texto')
    .isLength({ max: 50 }).withMessage('El campo name no puede superar los 50 caracteres'),

  body('authorized')
    .notEmpty().withMessage('El campo authorized es requerido')
    .isBoolean().withMessage('El campo authorized debe ser un booleano'),

  body('role_description')
    .notEmpty().withMessage('El campo role_description es requerido')
    .isString().withMessage('El campo role_description debe ser una cadena de texto'),
];

export const updateOperatorValidate = [
  body('ci')
    .optional()
    .isString().withMessage('El campo ci debe ser una cadena de texto')
    .isLength({ max: 44 }).withMessage('El campo ci no puede superar los 44 caracteres'),

  body('name')
    .optional()
    .isString().withMessage('El campo name debe ser una cadena de texto')
    .isLength({ max: 50 }).withMessage('El campo name no puede superar los 50 caracteres'),

  body('authorized')
    .optional()
    .isBoolean().withMessage('El campo authorized debe ser un booleano'),

  body('role_description')
    .optional()
    .isString().withMessage('El campo role_description debe ser una cadena de texto'),
];

