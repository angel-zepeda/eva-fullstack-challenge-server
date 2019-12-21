const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);