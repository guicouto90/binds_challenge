const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const dbConnection = require('../middlewares/dbConnection');
const usersRouter = require('../routes/userRouter');
const loginRouter = require('../routes/loginRouter');
const bookRouter = require('../routes/bookRouter');
const app = express();

app.use(express.json());

app.use(dbConnection);

app.get('/', (req, res) => {
  return res.send('Olá, essa é uma API para o teste técnico da empresa Binds, consulte a documentação: https://github.com/guicouto90/binds_challenge, para acessar as rotas corretas. ')
})

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/books', bookRouter);

app.use(errorHandler);

module.exports = app;