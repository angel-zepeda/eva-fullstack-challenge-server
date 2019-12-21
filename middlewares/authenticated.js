const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'eva_clave_secreta';

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(404).send({ message: "Theres not header on request" });
  }
  const token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token has expired" })
    }
  } catch (ex) {
    return res.status(404).send({ message: "Invalid Token" })
  }

  req.user = payload;
  next();

}