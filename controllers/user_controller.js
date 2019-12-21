const User = require('../models/User');

const index = (req, res) => {
  User.find({})
    .lean()
    .exec((err, users) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!users) return res.status(404).send({ code: 404, message: "Theres not users" });
      return res.status(200).send({ code: 200, data: users, message: "Request successfully" });
    })
}


module.exports = {
  index
}