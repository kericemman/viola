const express = require("express");
const { getServices, createService } = require("../controllers/service.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, createService);

module.exports = router;
