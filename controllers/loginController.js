const { newLogin } = require("../services/loginService");
const { OK } = require("../utils/statusCode");

const login = async (req, res, next) => {
  try {
    const token = await newLogin(req.body);

    return res.status(OK).json({ token });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login
}