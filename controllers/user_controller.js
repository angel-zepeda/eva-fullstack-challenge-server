const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

/**
 * index function returns all users stored in database
 */
function index(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: "Something went wrong" });
    if (!users) return res.status(404).send({ code: 404, message: "Theres not users" })
    return res.status(200).send(users);
  }).sort('_id')
}


/**
 * register function returns user registered and stored in DB
 */
function register(req, res) {
  const params = req.body;
  let user = new User();
  user.name = params.name;
  user.email = params.email;
  user.role = params.role;
  User.find({ email: user.email.toLowerCase() })
    .exec((err, users) => {
      if (err) return res.send({ code: 500, message: "Something went wrong" })
      if (users && users.length >= 1) {
        return res.send({
          code: 404,
          message: "Email has been taken"
        })
      } else {
        bcrypt.hash(params.password, null, null, (err, hash) => {
          user.password = hash;
          user.save((err, userStore) => {
            if (err) return res.send({ code: 500, message: "Something went wrong" })
            if (!userStore) return res.send({ code: 404, message: "This user cant be saved" })
            return res.status(200).send({ code: 200, user: userStore });
          })
        });
      }
    });
}

function loginUser(req, res) {
  const { email, password, getToken } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.status(500).send({ message: "Something went wrong" });
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          if (getToken) {
            user.password = undefined;
            return res.status(200).send({ code: 200, user: user, token: jwt.createToken(user) });
          } else {
            user.password = undefined;
            return res.status(200).send({ code: 200, user });
          }
        } else {
          res.send({ code: 404, message: "Password is incorrect" })
        }
      });
    } else {
      res.send({ code: 404, message: "User unknown" })
    }
  });
}

function getUser(req, res) {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) return res.status(500).send({ message: "Something went wrong" });
    if (!user) return res.status(404).send({ message: "User is unknown" });
    return res.status(200).send({ user });
  });
}

module.exports = {
  index,
  register,
  loginUser,
  getUser,

}