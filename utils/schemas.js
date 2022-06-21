const joi = require('joi');

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

const bookSchema = joi.object({
  title: joi.string().not().empty().required(),
  type: joi.string().not().empty().required(),
  author: joi.string().not().empty().required(),
  userId: joi.string().not().empty().required()
})

module.exports = { 
  userSchema,
  bookSchema
}