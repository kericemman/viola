const express = require("express");
const {
  getAvailability,
  createAvailability,
} = require("../controllers/availability.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getAvailability);
router.post("/", protect, createAvailability);

module.exports = router;
