const express = require("express");
const {
  initializeServicePayment,
} = require("../controllers/service.payment.controller");

const router = express.Router();

router.post("/initialize", initializeServicePayment);

module.exports = router;
