const { newBook, getBookById, getAllBooksByUser, eraseBook, editType, findByQuery } = require("../services/booksService");
const { CREATED, OK, NO_CONTENT } = require("../utils/statusCode");

const addBook = async (req, res, next) => {
  try {
    const book = await newBook(req.body, req.email);

    return res.status(CREATED).json(book);
  } catch (error) {
    next(error)
  }
}

const listBookById = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id, req.email);

    return res.status(OK).json(book);
  } catch (error) {
    next(error)
  }
}

const listAllBooksByUser = async (req, res, next) => {
  try {
    const book = await getAllBooksByUser(req.email);

    return res.status(OK).json(book);
  } catch (error) {
    next(error)
  }
}

const deleteBookById = async (req, res, next) => {
  try {
    await eraseBook(req.params.id, req.email);

    return res.status(NO_CONTENT).json();
  } catch (error) {
    next(error)
  }
}

const updateBookType = async (req, res, next) => {
  try {
    const book = await editType(req.params.id, req.email, req.body);

    return res.status(OK).json(book);
  } catch (error) {
    next(error)
  }
}

const listByQuery = async (req, res, next) => {
  try {
    const result = await findByQuery(req.email, req.query.type);
    
    return res.status(OK).json(result);
  } catch (error) {
    next(error)
  }
}


module.exports = {
  addBook,
  listBookById,
  listAllBooksByUser,
  deleteBookById,
  updateBookType,
  listByQuery
}