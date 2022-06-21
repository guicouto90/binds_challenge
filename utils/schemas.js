const joi = require('joi');

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

const passwordSchema = joi.object({
  password: joi.string().min(6).required(),
  newPassword: joi.string().min(6).required()
});

const bookSchema = joi.object({
  title: joi.string().not().empty().required(),
  type: joi.string().not().empty().required(),
  author: joi.string().not().empty().required(),
  userEmail: joi.string().email().required()
})

const typeSchema = joi.object({
  type: joi.string().not().empty().required(),
})

module.exports = { 
  userSchema,
  bookSchema,
  passwordSchema,
  typeSchema
}