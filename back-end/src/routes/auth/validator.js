/* eslint-disable no-undef */
const {body, validationResult} = require('express-validator');

require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
});

const userValidationRules = () => {
  return [
    // username must be an email
    body('username').isString().notEmpty().isLength({min: 6}),
    body('email').normalizeEmail().isEmail(),
    // password must be at least 5 chars long
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

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
