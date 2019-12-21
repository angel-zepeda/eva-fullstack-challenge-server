const Clinic = require('../models/Clinic');

const index = (req, res) => {
  Clinic.find({})
    .exec((err, clinics) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!clinics) return res.status(404).send({ code: 404, message: "Theres not clinics" });
      return res.status(200).send({ code: 200, data: clinics, message: "Request successfully" });
    })
}


module.exports = {
  index
}