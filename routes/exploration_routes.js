const express = require('express');
const route = express.Router();
const exploration_controller = require('../controllers/exploration_controller');
const md_auth = require('../middlewares/authenticated');

route.get('/explorations', md_auth.ensureAuth, exploration_controller.index);
route.get('/exploration/booking/:id', md_auth.ensureAuth, exploration_controller.findExplorationByBooking);
route.get('/explorations/search', md_auth.ensureAuth, exploration_controller.filterByClinic);

module.exports = route;


