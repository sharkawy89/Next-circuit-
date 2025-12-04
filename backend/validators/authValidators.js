const Joi = require('joi');

// Reusable validation schemas for auth routes

// Password rules: min 8, at least one letter and one number
const passwordRule = Joi.string()
  .min(8)
  .pattern(/[a-zA-Z]/, 'letters')
  .pattern(/[0-9]/, 'numbers')
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.name': 'Password must include letters and numbers'
  });

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: passwordRule.required().messages({ 'any.required': 'Password is required' }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({ 'any.required': 'Password is required', 'string.empty': 'Password is required' })
});

module.exports = {
  registerSchema,
  loginSchema
};
