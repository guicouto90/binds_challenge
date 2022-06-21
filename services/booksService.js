const Books = require("../models/Books");
const mongoose = require('mongoose');
const errorConstructor = require("../utils/errorConstructor");
const { bookNotFound, userUnauthorized } = require("../utils/errorMessages");
const { bookSchema, typeSchema } = require("../utils/schemas");
const { NOT_FOUND, UNAUTHORIZED } = require("../utils/statusCode");

const validateBooksSchema = (title, type, author, userEmail) => {
  const { error } = bookSchema.validate({ title, type, author, userEmail });
  if(error) throw error;
}

const validateTypeSchema = (type) => {
  const { error } = typeSchema.validate({ type });
  if(error) throw error;
}

const verifyBookById = async (id) => {
  mongoose.Types.ObjectId(id);
  const book = await Books.findById(id);
  if(!book) throw errorConstructor(NOT_FOUND, bookNotFound);

  return book;
}

const verifyAccessByEmail = (bookEmail, userEmail) => {
  if(bookEmail !== userEmail) throw errorConstructor(UNAUTHORIZED, userUnauthorized);
}

const newBook = async (body, userEmail) => {
  const { title, type, author } = body;
  validateBooksSchema(title, type, author, userEmail);
  const book = await Books.create({ title, type, author, userEmail });

  return book;
}

const getBookById = async (id, userEmail) => {
  const book = await verifyBookById(id);
  verifyAccessByEmail(book.userEmail, userEmail);

  return book;
}

const getAllBooksByUser = async (userEmail) => {
  const books = await Books.find({ userEmail });

  return books;
}

const eraseBook = async (id, userEmail) => {
  const book = await verifyBookById(id);
  verifyAccessByEmail(book.userEmail, userEmail);

  await Books.findByIdAndDelete(id);
}

const editType = async(id, userEmail, body) => {
  const { type } = body;
  validateTypeSchema(type);
  const book = await verifyBookById(id);
  verifyAccessByEmail(book.userEmail, userEmail);

  await Books.findByIdAndUpdate(id, { type });

  return { message: `Book ${book.title} updated successfully `}
}

const findByQuery = async (userEmail, type) => {
  const books = await getAllBooksByUser(userEmail);
  const filteredBooks = books.filter((book) => book.type.includes(type));

  return filteredBooks;
}

module.exports = {
  newBook,
  getBookById,
  getAllBooksByUser,
  eraseBook,
  editType,
  findByQuery
}