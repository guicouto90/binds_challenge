const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const dbConnection = require('../middlewares/dbConnection');
const usersRouter = require('../routes/userRouter');
const app = express();

app.use(express.json());

app.use(dbConnection);

app.use('/users', usersRouter);

app.use(errorHandler);

module.exports = app;