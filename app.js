const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const booking_routes = require('./routes/booking_routes');
const exploration_routes = require('./routes/exploration_routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet());
app.use(morgan('tiny'));


app.use('/api/v1/', [
  booking_routes,
  exploration_routes,
]);

module.exports = app;



