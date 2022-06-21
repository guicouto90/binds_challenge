const express = require('express');
const { addBook, listBookById, listAllBooksByUser, deleteBookById, updateBookType } = require('../controllers/booksController');
const { validateToken } = require('../middlewares/auth');

const bookRouter = express.Router();

bookRouter.get('/:id', validateToken, listBookById);
bookRouter.get('/', validateToken, listAllBooksByUser);
bookRouter.post('/', validateToken, addBook);
bookRouter.delete('/:id', validateToken, deleteBookById);
bookRouter.put('/:id', validateToken, updateBookType);

module.exports = bookRouter;
