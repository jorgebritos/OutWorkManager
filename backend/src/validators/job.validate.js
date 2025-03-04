import Enterprise from "../database/Models/Enterprise.js";
import { body } from 'express-validator'
import moment from "moment";

export const createJobValidate = [
  body('description')
    .isString().withMessage('Description must be a string.')
    .notEmpty().withMessage('Description is required.'),

  body('is_check')
    .optional()
    .isBoolean().withMessage('is_check must be a boolean value.'),

  body('is_check_enterprise')
    .optional()
    .isBoolean().withMessage('is_check_enterprise must be a boolean value.'),

  body('in_datetime')
    .isString().withMessage('in_datetime must be a string.')
    .notEmpty().withMessage('in_datetime is required.')
    .custom(value => {
      if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('in_datetime must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('in_datetime_confirm')
    .optional()
    .isString().withMessage('in_datetime_confirm must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('in_datetime_confirm must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('out_datetime')
    .isString().withMessage('out_datetime must be a string.')
    .notEmpty().withMessage('out_datetime is required.')
    .custom(value => {
      if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('out_datetime must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('out_datetime_confirm')
    .optional()
    .isString().withMessage('out_datetime_confirm must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('out_datetime_confirm must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('enterprise_id')
    .isMongoId().withMessage('enterprise_id must be a valid MongoDB ObjectId.')
    .notEmpty().withMessage('enterprise_id is required.')
    .custom(async (value) => {
      const enterpriseExists = await Enterprise.findById(value);
      if (!enterpriseExists) {
        throw new Error('The provided enterprise_id does not exist.');
      }
      return true;
    }),
];

export const updateJobValidate = [
  body('description')
    .optional()
    .isString().withMessage('Description must be a string.')
    .notEmpty().withMessage('Description cannot be empty.'),

  body('is_check')
    .optional()
    .isBoolean().withMessage('is_check must be a boolean value.'),

  body('is_check_enterprise')
    .optional()
    .isBoolean().withMessage('is_check_enterprise must be a boolean value.'),

  body('in_datetime')
    .optional()
    .isString().withMessage('in_datetime must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('in_datetime must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('in_datetime_confirm')
    .optional()
    .isString().withMessage('in_datetime_confirm must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('in_datetime_confirm must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('out_datetime')
    .optional()
    .isString().withMessage('out_datetime must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('out_datetime must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('out_datetime_confirm')
    .optional()
    .isString().withMessage('out_datetime_confirm must be a string.')
    .custom(value => {
      if (value && !moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        throw new Error('out_datetime_confirm must be in the format "YYYY-MM-DD HH:mm:ss".');
      }
      return true;
    }),

  body('enterprise_id')
    .optional()
    .isMongoId().withMessage('enterprise_id must be a valid MongoDB ObjectId.')
    .custom(async (value) => {
      if (value) {
        const enterpriseExists = await Enterprise.findById(value);
        if (!enterpriseExists) {
          throw new Error('The provided enterprise_id does not exist.');
        }
      }
      return true;
    }),
];

