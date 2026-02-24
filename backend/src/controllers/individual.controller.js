const IndividualOrder = require("../models/IndividualOrder");
const { v4: uuidv4 } = require("uuid");
const {
  sendIndividualOrderEmails
} = require("../services/individualOrderEmail.service");

exports.createIndividualOrder = async (req, res) => {
  const order = await IndividualOrder.create({
    ...req.body,
    transactionRef: uuidv4()
  });

  sendIndividualOrderEmails(order).catch(console.error);

  res.status(201).json(order);
};

exports.getIndividualOrders = async (req, res) => {
  const orders = await IndividualOrder.find().sort({
    createdAt: -1
  });

  res.json(orders);
};


exports.updateIndividualOrder = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus, adminNote } = req.body;
  
    const order = await IndividualOrder.findByIdAndUpdate(
      id,
      { paymentStatus, adminNote },
      { new: true }
    );
  
    res.json(order);
    if (paymentStatus === "completed") {
        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: order.email,
          subject: "Your Service Has Been Completed",
          html: `<p>Hi ${order.name},</p>
                 <p>Your session for ${order.serviceTitle} has been completed.</p>
                 <p>Thank you for working with us.</p>`
        });
      }
      
  };

  exports.deleteIndividualOrder = async (req, res) => {
    const { id } = req.params;
  
    await IndividualOrder.findByIdAndDelete(id);
  
    res.json({ message: "Order deleted" });
  };
  