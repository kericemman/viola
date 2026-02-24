const OrganizationInquiry = require("../models/OrganizationInquiry");
const {
  sendOrgInquiryEmails
} = require("../services/orgInquiryEmail.service");

exports.createOrganizationInquiry = async (req, res) => {
  const inquiry = await OrganizationInquiry.create(req.body);

  sendOrgInquiryEmails(inquiry).catch(console.error);

  res.status(201).json({ message: "Inquiry submitted" });
};

exports.getOrganizationInquiries = async (req, res) => {
  const inquiries = await OrganizationInquiry.find().sort({
    createdAt: -1
  });

  res.json(inquiries);
};

exports.updateOrganizationInquiry = async (req, res) => {
  const { id } = req.params;
  const { status, adminNote } = req.body;

  const inquiry = await OrganizationInquiry.findByIdAndUpdate(
    id,
    { status, adminNote },
    { new: true }
  );

  res.json(inquiry);
};

