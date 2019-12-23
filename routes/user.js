const express = require('express');
const route = express.Router();
const user_controller = require('../controllers/user_controller');

route.post('/register', user_controller.register);
route.post('/login', user_controller.loginUser);
route.get('/users', user_controller.index);
route.get('/user/:id', user_controller.getUser);


module.exports = route;


