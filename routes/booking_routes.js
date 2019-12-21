const express = require('express');
const route = express.Router();
const bookings_controller = require('../controllers/booking_controller');

route.get('/bookings/', bookings_controller.index);


module.exports = route;


