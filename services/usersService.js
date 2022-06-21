const Users = require("../models/Users");
const cryptoPass = require("../utils/cryptoPassword");
const errorConstructor = require("../utils/errorConstructor");
const { emailRegistered } = require("../utils/errorMessages");
const { userSchema } = require("../utils/schemas");
const { CONFLICT } = require("../utils/statusCode");

const validateUserSchema = (email, password) => {
  const { error } = userSchema.validate({ email, password });
  if(error) throw error;
}

const verifyUser = async (email) => {
  const user = await Users.findOne({ email });
  if(user) throw errorConstructor(CONFLICT, emailRegistered);
}

const newUser = async (body) => {
  const { email, password } = body;
  validateUserSchema(email, password);
  await verifyUser(email);
  const finalPassword = cryptoPass(password);
  await Users.create({ email, password: finalPassword });

  return { messsage: `User with email ${email} registered succesfully` }
}

module.exports = {
  newUser
}