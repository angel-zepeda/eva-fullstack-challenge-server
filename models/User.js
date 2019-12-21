const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);