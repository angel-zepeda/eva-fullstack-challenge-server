const express = require('express');
const route = express.Router();
const user_controller = require('../controllers/user_controller');

route.get('/users', user_controller.index);


module.exports = route;


