const express = require('express');
const route = express.Router();
const exploration_controller = require('../controllers/exploration_controller');

route.get('/explorations/', exploration_controller.index);


module.exports = route;


