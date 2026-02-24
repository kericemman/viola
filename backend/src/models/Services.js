const mongoose = require("mongoose");

const intakeFieldSchema = new mongoose.Schema({
  label: String,
  name: String,
  type: {
    type: String,
    enum: ["text", "textarea", "select", "file"],
    default: "text",
  },
  required: { type: Boolean, default: false },
  options: [String], // for select fields
});

const serviceModelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    category: {
        type: String,
        enum: ["individual", "organization"],
        required: true,
      },
      

    type: {
      type: String,
      enum: ["fixed", "custom"],
      required: true,
    },

    price: Number, // only used if fixed
    currency: { type: String, default: "USD" },

    intakeFields: [intakeFieldSchema],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceModel", serviceModelSchema);
