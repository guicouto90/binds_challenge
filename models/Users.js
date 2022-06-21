const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const Users = model('Users', userSchema);

module.exports = Users;