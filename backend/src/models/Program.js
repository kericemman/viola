const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    duration: String,
    type: {
      type: String,
      enum: ["1:1", "Group", "Workshop"],
      default: "1:1",
    },
    imageUrl: String,
    isPaid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
