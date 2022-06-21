const { newUser } = require("../services/usersService");
const { CREATED } = require("../utils/statusCode");

const addUser = async(req, res, next) => {
  try {
    const user = await newUser(req.body);

    return res.status(CREATED).json(user);
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  addUser
}