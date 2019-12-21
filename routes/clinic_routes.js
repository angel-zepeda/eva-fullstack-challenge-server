const express = require('express');
const route = express.Router();
const clinic_controller = require('../controllers/clinic_controller.js');

route.get('/clinics', clinic_controller.index);


module.exports = route;


