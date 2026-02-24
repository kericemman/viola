const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendServiceRequestEmails = async (request) => {
  // Client email
  await resend.emails.send({
    from: "Roman Brenda Viola <no-reply@updates.romanbrendaviola.com>",
    to: request.email,
    subject: "We’ve received your inquiry",
    html: `
      <p>Hi ${request.name},</p>
      <p>Thank you for your interest in <strong>${request.serviceTitle}</strong>.</p>
      <p>We’ve received your request and will contact you within 24 hours.</p>
      <p><strong>Your goals:</strong><br/>${request.goals}</p>
      <br/>
      <p>Warm regards,<br/>Brenda</p>
    `,
  });

  // Admin email
  await resend.emails.send({
    from: "System <no-reply@updates.romanbrendaviola.com>",
    to: "hello@romanbrendaviola.com",
    subject: `New Service Inquiry: ${request.serviceTitle}`,
    html: `
      <h3>New Service Request</h3>
      <ul>
        <li><strong>Name:</strong> ${request.name}</li>
        <li><strong>Email:</strong> ${request.email}</li>
        <li><strong>Phone:</strong> ${request.phone || "N/A"}</li>
        <li><strong>Service:</strong> ${request.serviceTitle}</li>
        <li><strong>Price:</strong> ${request.price}</li>
      </ul>
      <p><strong>Challenges:</strong><br/>${request.challenges}</p>
      <p><strong>Goals:</strong><br/>${request.goals}</p>
    `,
  });
};
