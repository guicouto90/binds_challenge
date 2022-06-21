const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const dbConnection = require('../utils/dbConnection');
const app = express();

app.use(express.json());
app.use(dbConnection);

app.use(errorHandler);

module.exports = app;