const Booking = require('../models/Booking');

/**
 * Index function response all bookings stored in database
 * return json response with code, message or data
 * STATUS CODES:
 *  500: Request is incorrect
 *  404: Theres not bookings stored
 *  200: Request successfully done and information found
 */
const index = (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  Booking.find({})
    .lean()
    .limit(parseInt(limit))
    .skip(parseInt(page * limit))
    .exec((err, bookings) => {
      if (err) return res.status(500).send({ code: 500, message: "Something went wrong", error: err });
      if (!bookings) return res.status(404).send({ code: 404, message: "Theres not bookings" });
      return res.status(200).send({ code: 200, data: bookings, message: "Request successfully" });
    })
}


module.exports = {
  index
}