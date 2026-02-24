const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendIndividualOrderEmails = async (order) => {
  // Client confirmation
  await resend.emails.send({
    from: "Roman Brenda <no-reply@brenda.com>",
    to: order.email,
    subject: "Your Service Booking Confirmation",
    html: `
      <p>Hi ${order.name},</p>

      <p>We’ve received your booking for:</p>
      <strong>${order.serviceTitle}</strong>

      <p>Status: ${order.paymentStatus}</p>

      ${
        order.paymentStatus === "pay_later"
          ? "<p>Please expect payment instructions shortly.</p>"
          : ""
      }

      <br/>
      <p>Warm regards,<br/>Brenda</p>
    `
  });

  // Admin notification
  await resend.emails.send({
    from: "System <no-reply@brenda.com>",
    to: "admin@brenda.com",
    subject: `New Individual Booking: ${order.serviceTitle}`,
    html: `
      <h3>New Booking</h3>
      <ul>
        <li>Name: ${order.name}</li>
        <li>Email: ${order.email}</li>
        <li>Phone: ${order.phone || "N/A"}</li>
        <li>Service: ${order.serviceTitle}</li>
        <li>Status: ${order.paymentStatus}</li>
      </ul>
    `
  });
};
