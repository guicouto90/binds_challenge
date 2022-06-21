const { generateToken } = require("../middlewares/auth");
const Users = require("../models/Users");
const cryptoPass = require("../utils/cryptoPassword");
const errorConstructor = require("../utils/errorConstructor");
const { invalidLogin } = require("../utils/errorMessages");
const { userSchema } = require("../utils/schemas");
const { UNAUTHORIZED } = require("../utils/statusCode");

const validateLoginSchema = (email, password) => {
  const { error } = userSchema.validate({ email, password });
  if(error) throw error;
}

const verifyLogin = async (body) => {
  const { email, password } = body;
  validateLoginSchema(email, password);
  const cryptoPassword = cryptoPass(password);
  const user = await Users.findOne({ email });
  if(!user || user.password !== cryptoPassword) throw errorConstructor(UNAUTHORIZED, invalidLogin);
  
}

const newLogin = async(body) => {
  await verifyLogin(body);
  const token = generateToken(body.email);

  return token;
}

module.exports = {
  newLogin
}