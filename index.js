const mongoose = require('mongoose');
require('dotenv').config()
const PORT = 5000;
const app = require('./app');
const DB = "mongodb://localhost:27017/eva";

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Se conectó exitosamente");
    app.listen(PORT, () => {
      console.log("Servidor corriendo en puerto: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
