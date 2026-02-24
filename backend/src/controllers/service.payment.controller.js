const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const ServiceOrder = require("../models/ServiceOrder");

exports.initializeServicePayment = async (req, res) => {
  const {
    serviceId,
    serviceTitle,
    amount,
    customerName,
    customerEmail,
    intakeResponses,
  } = req.body;

  const reference = uuidv4();

  // Create order first
  await ServiceOrder.create({
    serviceId,
    serviceTitle,
    amount,
    customerName,
    customerEmail,
    intakeResponses,
    transactionRef: reference,
  });

  // Paystack init
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email: customerEmail,
      amount: amount * 100,
      reference,
      callback_url: `${process.env.FRONTEND_URL}/service-payment-success`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  res.json({
    authorization_url:
      response.data.data.authorization_url,
  });

  if (event.event === "charge.success") {
    const reference = event.data.reference;
  
    const serviceOrder =
      await ServiceOrder.findOneAndUpdate(
        { transactionRef: reference },
        { paymentStatus: "paid" },
        { new: true }
      );
  
    if (serviceOrder) {
      console.log("Service payment confirmed");
    }
  }
};






