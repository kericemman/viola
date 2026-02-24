const Service = require("../models/Services");

// PUBLIC — get active services
exports.getServices = async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.json(services);
};

// PUBLIC — single service
exports.getService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.json(service);
};

// ADMIN — create
exports.createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

// ADMIN — update
exports.updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(service);
};

// ADMIN — soft delete
exports.deleteService = async (req, res) => {
  await Service.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });
  res.sendStatus(204);
};
