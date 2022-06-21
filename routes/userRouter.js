const express = require('express');
const { addUser } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', addUser);

module.exports = usersRouter;