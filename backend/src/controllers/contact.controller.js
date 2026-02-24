const ContactMessage = require("../models/ContactMessage");
const { sendContactEmails } = require("../services/sendContactEmail");

exports.submitContactForm = async (req, res) => {
  const message = await ContactMessage.create(req.body);

  // fire & forget emails
  sendContactEmails(message).catch(console.error);

  res.status(201).json({ message: "Message received" });
};

exports.getContactMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({
    createdAt: -1,
  });
  res.json(messages);
};
