const express = require("express");
const {
  createOrganizationInquiry,
  getOrganizationInquiries,
  updateOrganizationInquiry
} = require("../controllers/orginquiry.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", createOrganizationInquiry);
router.get("/", protect, getOrganizationInquiries);
router.patch("/:id", protect, updateOrganizationInquiry);


module.exports = router;
