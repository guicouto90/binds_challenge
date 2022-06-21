const Users = require("../models/Users");
const cryptoPass = require("../utils/cryptoPassword");
const errorConstructor = require("../utils/errorConstructor");
const { emailRegistered, invalidPassword } = require("../utils/errorMessages");
const { userSchema, passwordSchema } = require("../utils/schemas");
const { CONFLICT, UNAUTHORIZED } = require("../utils/statusCode");

const validateUserSchema = (email, password) => {
  const { error } = userSchema.validate({ email, password });
  if(error) throw error;
}

const verifyUser = async (email) => {
  const user = await Users.findOne({ email });
  if(user) throw errorConstructor(CONFLICT, emailRegistered);
}

const validateNewPassword = (password, newPassword) => {
  const { error } = passwordSchema.validate({ password, newPassword });
  if(error) throw error;
}

const verifyUserEditPassword = async(email, password) => {
  const user = await Users.findOne({ email });
  const cryptoPassword = cryptoPass(password);
  if(user.password !== cryptoPassword) throw errorConstructor(UNAUTHORIZED, invalidPassword);

  return user;
}

const newUser = async (body) => {
  const { email, password } = body;
  validateUserSchema(email, password);
  await verifyUser(email);
  const finalPassword = cryptoPass(password);
  await Users.create({ email, password: finalPassword });

  return { messsage: `User with email ${email} registered succesfully` }
}

const editPassword = async(email, body) => {
  const { password, newPassword } = body;
  validateNewPassword(password, newPassword);
  const user = await verifyUserEditPassword(email, password);
  const cryptoPassword = cryptoPass(newPassword);
  await Users.findByIdAndUpdate(user._id, { password: cryptoPassword });

  return { message: `Password updated successfully` }
}

const eraseUser = async(email) => {
  await Users.findOneAndDelete({ email });
}

module.exports = {
  newUser,
  editPassword,
  eraseUser
}