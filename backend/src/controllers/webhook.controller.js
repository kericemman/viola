const crypto = require("crypto");
const Booking = require("../models/Booking");
const { sendBookingEmail } = require("../services/email.service");

exports.paystackWebhook = async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const hash = crypto
    .createHmac("sha512", secret)
    .update(req.body)
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString());

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    const booking = await Booking.findOneAndUpdate(
      { transactionRef: reference },
      { paymentStatus: "paid" },
      { new: true }
    );

    if (booking) {
      await sendBookingEmail(booking.email, booking.name);
    }
  }

  res.sendStatus(200);
};
