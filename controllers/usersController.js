const { newUser, editPassword, eraseUser } = require("../services/usersService");
const { CREATED, NO_CONTENT } = require("../utils/statusCode");

const addUser = async(req, res, next) => {
  try {
    const user = await newUser(req.body);

    return res.status(CREATED).json(user);
  } catch (error) {
    next(error)
  }
}

const updatePassword = async(req, res, next) => {
  try {
    const user = await editPassword(req.email, req.body);

    return res.status(CREATED).json(user);
  } catch (error) {
    next(error)
  }
}

const deleteUser = async(req, res, next) => {
  try {
    const user = await eraseUser(req.email);

    return res.status(NO_CONTENT).json(user);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addUser,
  updatePassword,
  deleteUser
}