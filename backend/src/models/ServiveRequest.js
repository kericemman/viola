const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    serviceTitle: String,
    price: String,
    duration: String,

    name: String,
    email: String,
    phone: String,

    challenges: String,
    goals: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
