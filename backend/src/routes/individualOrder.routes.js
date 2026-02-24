const express = require("express");
const {
  createIndividualOrder,
  getIndividualOrders,
  updateIndividualOrder,
  deleteIndividualOrder
} = require("../controllers/individual.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", createIndividualOrder);
router.get("/", protect, getIndividualOrders);
router.patch("/:id", protect, updateIndividualOrder);
router.delete("/:id", protect, deleteIndividualOrder);


module.exports = router;
