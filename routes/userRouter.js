const express = require('express');
const { addUser, updatePassword, deleteUser } = require('../controllers/usersController');
const { validateToken } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post('/', addUser);
usersRouter.put('/', validateToken, updatePassword);
usersRouter.delete('/', validateToken, deleteUser);

module.exports = usersRouter;