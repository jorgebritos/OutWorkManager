import { body } from 'express-validator';

export const createJobValidate = [
  body('description')
    .notEmpty().withMessage('El campo description es requerido.')
    .isString().withMessage('El campo description debe ser una cadena de texto.'),
  
  body('is_check')
    .optional()
    .isBoolean().withMessage('El campo is_check debe ser un booleano.'),

  body('date')
    .notEmpty().withMessage('El campo date es requerido.')
    .isDate().withMessage('El campo date debe ser una fecha válida.')
    .custom((value) => {
      const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      if (value < today) {
        throw new Error(`El campo date debe ser igual o posterior a ${today}`);
      }
      return true;
    }),

  body('in_time')
    .notEmpty().withMessage('El campo in_time es requerido.')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('El campo in_time debe tener el formato HH:mm.'),

  body('out_time')
    .notEmpty().withMessage('El campo out_time es requerido.')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('El campo out_time debe tener el formato HH:mm.'),

  body('enterprise_id')
    .notEmpty().withMessage('El campo enterprise_id es requerido.')
    .isInt().withMessage('El campo enterprise_id debe ser un número entero.')
];

export const updateJobValidate = [
  body('description')
    .optional()
    .isString().withMessage('El campo description debe ser una cadena de texto.'),

  body('is_check')
    .optional()
    .isBoolean().withMessage('El campo is_check debe ser un booleano.'),

  body('date')
    .optional()
    .isISO8601().withMessage('El campo date debe ser una fecha válida en formato YYYY-MM-DD.'),

  body('in_time')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('El campo in_time debe tener el formato HH:mm.'),

  body('out_time')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('El campo out_time debe tener el formato HH:mm.'),

  body('enterprise_id')
    .optional()
    .isInt().withMessage('El campo enterprise_id debe ser un número entero.')
];
