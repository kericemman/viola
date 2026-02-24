const mongoose = require("mongoose");

const individualOrderSchema = new mongoose.Schema(
  {
    serviceId: String,
    serviceTitle: String,
    price: Number,

    name: String,
    email: String,
    phone: String,
    challenges: String,
    goals: String,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "pay_later", "cancelled", "completed"],
      default: "pending"
    },

    adminNote: String,

    transactionRef: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("IndividualOrder", individualOrderSchema);
