require("dotenv").config();

const express = require("express");
const serviceRoutes = require("./service.routes");
const programRoutes = require("./program.routes");
const bookingRoutes = require("./booking.routes");
const paymentRoutes = require("./payment.routes");
const authRoutes = require("./auth.routes");
const uploadRoutes = require("./upload.routes");
const availabilityRoutes = require("./availability.routes")
const productRoutes = require("./product.routes");
const newsletterRoutes = require("./newsletter.routes");
const serviceRequestRoutes = require("./service.request.routes");
const contactRoutes = require("./contact.routes");
const servicesPaymentRoutes = require("./service.payment.routes");
const individualOrderRoutes = require("./individualOrder.routes");
const orgInquiryRoutes = require("./orgInquiry.routes");










const router = express.Router();

router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/programs", programRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/availability", availabilityRoutes);
router.use("/uploads", uploadRoutes);
router.use("/products", productRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/service-requests", serviceRequestRoutes);
router.use("/contact", contactRoutes);
router.use("/service-payments", servicesPaymentRoutes);

router.use("/individual-orders", individualOrderRoutes);
router.use("/organization-inquiries", orgInquiryRoutes);







module.exports = router;
