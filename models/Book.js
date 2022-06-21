const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: String, required: true }
})

const Books = model('Books', bookSchema);

module.exports = Books;