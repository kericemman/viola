const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionRef: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
