const Exploration = require('../models/Exploration');

/**
 * Index function response all explorations stored in database with bookings association
 * return json response with code, message or data
 * STATUS CODES:
 *  500: Request is incorrect
 *  404: Theres not bookings stored
 *  200: Request successfully done and information found
 */
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

/**
 * findExplorationByBooking function response explorations stored in database by bookingId
 * return json response with code, message or data
 * STATUS CODES:
 *  500: Request is incorrect
 *  404: Theres not explorations stored
 *  200: Request successfully done and information found
 */
const findExplorationByBooking = (req, res) => {
  const { id } = req.params;
  Exploration.find({ 'bookingId': id })
    .exec((err, exploration) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong" });
      if (!exploration) return res.status(404).send({ code: 404, message: "Theres not explorations" });
      return res.status(200).send({ code: 200, data: exploration, message: "Request successfully" });
    })
}


/**
 * filterByClinic function response explorations stored in database based these query params
 * @queryparam clinic This param search exploration by clinicName
 * @queryparam limit  This param is the limit of found results
 * @queryparam page   Param to paginate results
 * @queryparam medications This params search and filter consumed medications 
 * @queryparam strict This params is LAX or STRICT mode, TRUE=strict FALSE=lax
 * STATUS CODES:
 *  500: Request is incorrect
 *  404: Theres not explorations stored
 *  200: Request successfully done and information found
 */
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