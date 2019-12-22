const Exploration = require('../models/Exploration');

const index = (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;

  Exploration.find({})
    .lean()
    .limit(parseInt(limit))
    .skip(parseInt(page * limit))
    .populate('bookingId')
    .exec((err, explorations) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!explorations) return res.status(404).send({ code: 404, message: "Theres not explorations" });
      return res.status(200).send({ code: 200, data: explorations, message: "Request successfully" });
    })
}

const findExplorationByBooking = (req, res) => {
  const { id } = req.params;
  Exploration.find({ 'bookingId': id })
    .exec((err, exploration) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!exploration) return res.status(404).send({ code: 404, message: "Theres not explorations" });
      return res.status(200).send({ code: 200, data: exploration, message: "Request successfully" });
    })
}

const filterByClinic = (req, res) => {
  const { clinic, limit, page, medications, strict } = req.query;

  let mode;
  mode = strict === 'true' ? medications : new RegExp(medications, "i");

  Exploration.find({ 'consumedMedications': mode })
    .lean()
    .limit(parseInt(limit))
    .skip(parseInt(page * limit))
    .populate({
      path: 'bookingId',
      match: {
        'clinicName': clinic
      }
    })
    .exec((err, explorations) => {
      explorations = explorations.filter(exploration => exploration['bookingId'] !== null)
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!explorations) return res.status(404).send({ code: 404, message: "Theres not explorations" });
      return res.status(200).send({ code: 200, data: explorations, message: "Request successfully" });
    })
}


module.exports = {
  index,
  findExplorationByBooking,
  filterByClinic
}