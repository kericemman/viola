const Booking = require("../models/Booking");
const { bookSlot } = require("./availability.controller");
const { v4: uuidv4 } = require("uuid");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    transactionRef: uuidv4(),
  });

  res.status(201).json(booking);
};



exports.createBooking = async (req, res) => {
  const { date, time } = req.body;

  const booking = await Booking.create({
    ...req.body,
    transactionRef: uuidv4(),
  });

  if (date && time) {
    await bookSlot(date, time);
  }

  res.status(201).json(booking);
};
