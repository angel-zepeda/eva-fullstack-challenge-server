const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const explorationSchema = Schema({
  consumedMedications: [String],
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' }
});

module.exports = mongoose.model('Exploration', explorationSchema);