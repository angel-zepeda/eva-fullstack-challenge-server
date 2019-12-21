const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicSchema = Schema({
  name: String
});

module.exports = mongoose.model('Clinic', clinicSchema);