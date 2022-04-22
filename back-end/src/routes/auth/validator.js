/* eslint-disable no-undef */
const {body, validationResult} = require('express-validator');
const path = require('path');

require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
});

const userValidationRules = () => {
  return [
    // username must be an email
    body('username').isString().notEmpty().isLength({min: 6}),
    body('email').normalizeEmail().isEmail(),
    // password must be at least 6 chars long
    body('password').matches(process.env.PASSWORD_REGEX),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({[err.param]: err.msg}));

  return res.status(400).json({
    success: false,
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
