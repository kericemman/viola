const express = require("express");
const {
  subscribe,
  getSubscribers,
  sendNewsletter,
} = require("../controllers/newsletter.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// public
router.post("/subscribe", subscribe);

// admin
router.get("/subscribers", protect, getSubscribers);
router.post("/send", protect, sendNewsletter);

module.exports = router;
