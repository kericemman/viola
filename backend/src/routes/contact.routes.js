const express = require("express");
const {
  submitContactForm,
  getContactMessages,
} = require("../controllers/contact.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// public
router.post("/", submitContactForm);

// admin
router.get("/", protect, getContactMessages);

module.exports = router;
