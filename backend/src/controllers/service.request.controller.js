const ServiceRequest = require("../models/ServiveRequest");
const {
  sendServiceRequestEmails,
} = require("../services/serviceRequestEmail");

exports.createServiceRequest = async (req, res) => {
  const request = await ServiceRequest.create(req.body);

  // Send emails (async, non-blocking)
  sendServiceRequestEmails(request).catch(console.error);

  res.status(201).json({ message: "Request submitted" });
};

exports.getServiceRequests = async (req, res) => {
  const requests = await ServiceRequest.find().sort({
    createdAt: -1,
  });
  res.json(requests);
};
