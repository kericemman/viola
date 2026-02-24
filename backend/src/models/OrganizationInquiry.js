const mongoose = require("mongoose");

const organizationInquirySchema = new mongoose.Schema(
  {
    serviceId: String,
    serviceTitle: String,

    organizationName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    size: String,

    challenges: String,
    goals: String,
    timeline: String, 

    status: {
        type: String,
        enum: ["new", "contacted", "proposal_sent", "closed"],
        default: "new"
      },
      adminNote: String
  },
  { timestamps: true }
  


 

);

module.exports = mongoose.model(
  "OrganizationInquiry",
  organizationInquirySchema
);



