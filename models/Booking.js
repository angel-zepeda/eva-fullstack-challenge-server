const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = Schema({
  datetime: String,
  name: String,
  email: String,
  clinicName: String
});

module.exports = mongoose.model('Booking', bookingSchema);