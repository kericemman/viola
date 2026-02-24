const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOrgInquiryEmails = async (inquiry) => {
  // Client confirmation
  await resend.emails.send({
    from: "Roman Brenda <no-reply@brenda.com>",
    to: inquiry.email,
    subject: "We’ve Received Your Inquiry",
    html: `
      <p>Hello ${inquiry.contactPerson},</p>

      <p>Thank you for your interest in:</p>
      <strong>${inquiry.serviceTitle}</strong>

      <p>We will review your request and respond within 24–48 hours.</p>

      <br/>
      <p>Warm regards,<br/>Brenda</p>
    `
  });

  // Admin notification
  await resend.emails.send({
    from: "System <no-reply@brenda.com>",
    to: "info@romambrendaviola.com",
    subject: `New Organization Inquiry: ${inquiry.serviceTitle}`,
    html: `
      <h3>New Organization Inquiry</h3>
      <ul>
        <li>Organization: ${inquiry.organizationName}</li>
        <li>Contact: ${inquiry.contactPerson}</li>
        <li>Email: ${inquiry.email}</li>
        <li>Size: ${inquiry.size}</li>
      </ul>
      <p><strong>Challenges:</strong><br/>${inquiry.challenges}</p>
    `
  });
};
