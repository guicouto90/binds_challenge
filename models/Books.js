const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  author: { type: String, required: true },
  userEmail: { type: String, required: true }
})

const Books = model('Books', bookSchema);

module.exports = Books;