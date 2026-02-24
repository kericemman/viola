const Availability = require("../models/Availability");

exports.getAvailability = async (req, res) => {
  const availability = await Availability.find();
  res.json(availability);
};

exports.createAvailability = async (req, res) => {
  const { date, slots } = req.body;

  const availability = await Availability.create({
    date,
    slots: slots.map((time) => ({ time })),
  });

  res.status(201).json(availability);
};

exports.bookSlot = async (date, time) => {
  await Availability.updateOne(
    { date, "slots.time": time },
    { $set: { "slots.$.isBooked": true } }
  );
};
