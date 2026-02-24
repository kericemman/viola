const Paystack = require("paystack-api");
const Booking = require("../models/Booking");

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

exports.initializePayment = async (req, res) => {
  const { email, amount, bookingId } = req.body;

  const response = await paystack.transaction.initialize({
    email,
    amount: amount * 100,
    reference: bookingId,
  });

  res.json(response.data);
};

exports.verifyPayment = async (req, res) => {
  const { reference } = req.params;

  const response = await paystack.transaction.verify(reference);

  if (response.data.status === "success") {
    await Booking.findOneAndUpdate(
      { transactionRef: reference },
      { paymentStatus: "paid" }
    );
  }

  res.json(response.data);
};
