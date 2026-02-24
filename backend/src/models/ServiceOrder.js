const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    serviceTitle: String,
    amount: Number,
    currency: { type: String, default: "USD" },

    customerName: String,
    customerEmail: String,

    intakeResponses: Object,

    transactionRef: String,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceOrder",
  serviceOrderSchema
);
