const express = require("express");
const {
  initializePayment,
  verifyPayment,
} = require("../controllers/payment.controller");
const {
  paystackWebhook,
} = require("../controllers/webhook.controller");

const router = express.Router();

router.post("/initialize", initializePayment);
router.get("/verify/:reference", verifyPayment);

// WEBHOOK
router.post("/webhook", paystackWebhook);

module.exports = router;
