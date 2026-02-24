const express = require("express");
const {
  createServiceRequest,
  getServiceRequests,
} = require("../controllers/service.request.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// public
router.post("/", createServiceRequest);

// admin
router.get("/", protect, getServiceRequests);

module.exports = router;
